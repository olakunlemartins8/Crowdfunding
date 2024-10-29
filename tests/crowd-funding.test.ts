import { describe, it, expect } from 'vitest';
import {
  createProject,
  backProject,
  refundProject,
  claimMilestone
} from '../contracts/crowd-funding';

describe('Decentralized Crowdfunding Platform', () => {
  it('should create a new project', () => {
    const projectTitle = 'Sample Project';
    const description = 'This is a sample crowdfunding project.';
    const rewards = [
      { level: 1, description: 'Reward 1', tokenAmount: 100 },
      { level: 2, description: 'Reward 2', tokenAmount: 200 }
    ];
    const fundingGoal = 10000;
    const deadline = 1000000000; // Timestamp
    
    const projectId = createProject(
        projectTitle,
        description,
        rewards,
        fundingGoal,
        deadline
    );
    
    expect(projectId).toBeDefined();
  });
  
  it('should allow users to back a project', () => {
    const projectTitle = 'Sample Project';
    const amount = 1000;
    
    backProject(projectTitle, amount);
    
    const project = getProject(projectTitle);
    expect(project.fundedAmount).toBe(amount);
    expect(project.backers).toContain(tx.sender);
  });
  
  it('should allow users to request a refund if the project fails', () => {
    const projectTitle = 'Sample Project';
    const amount = 1000;
    
    backProject(projectTitle, amount);
    
    // Mock deadline to be in the past
    setBlockTimestamp(project.deadline + 1);
    
    refundProject(projectTitle);
    
    const project = getProject(projectTitle);
    expect(project.isRefunded).toBe(true);
    expect(project.backers).not.toContain(tx.sender);
  });
  
  it('should allow the project creator to claim milestone payments', () => {
    const projectTitle = 'Sample Project';
    const amount = 1000;
    const milestoneIndex = 0;
    
    backProject(projectTitle, amount);
    
    // Mock project to be successful
    setProjectSuccessful(projectTitle);
    
    claimMilestone(projectTitle, milestoneIndex);
    
    const project = getProject(projectTitle);
    expect(project.milestoneClaimed[milestoneIndex]).toBe(true);
    expect(tx.receipts).toContain({ amount: project.milestonePayments[milestoneIndex].amount, recipient: tx.sender });
  });
});
