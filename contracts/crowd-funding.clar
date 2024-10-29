;; Crowdfunding Contract

;; Types
(define-map projects
  (string-key)
  ((contract-of
    (funded-amount uint)
    (funding-goal uint)
    (backers (list 20 principal))
    (project-title (string-ascii 100))
    (description (string-ascii 1000))
    (rewards (list 10 (tuple (level uint) (description (string-ascii 100)) (token-amount uint))))
    (deadline uint)
    (milestone-payments (list 10 (tuple (description (string-ascii 100)) (amount uint) (claimed bool))))
    (is-successful bool)
    (is-refunded bool))))

(define-public (create-project (project-title (string-ascii 100))
                              (description (string-ascii 1000))
                              (rewards (list 10 (tuple (level uint) (description (string-ascii 100)) (token-amount uint))))
                              (funding-goal uint)
                              (deadline uint))
  (begin
    (let ((project-details (contract-of
                            (funded-amount 0)
                            (funding-goal funding-goal)
                            (backers ())
                            (project-title project-title)
                            (description description)
                            (rewards rewards)
                            (deadline deadline)
                            (milestone-payments ())
                            (is-successful false)
                            (is-refunded false))))
      (map-insert projects project-title project-details)
      (ok project-title))))

(define-public (back-project (project-title (string-ascii 100)) (amount uint))
  (let ((project (map-get? projects project-title)))
    (if project
        (let ((updated-project (contract-of
                                (funded-amount (+ (get funded-amount project) amount))
                                (funding-goal (get funding-goal project))
                                (backers (cons tx-sender (get backers project)))
                                (project-title (get project-title project))
                                (description (get description project))
                                (rewards (get rewards project))
                                (deadline (get deadline project))
                                (milestone-payments (get milestone-payments project))
                                (is-successful (>= (get funded-amount project) (get funding-goal project)))
                                (is-refunded false)))))
          (map-insert projects project-title updated-project)
          (stx-transfer? amount tx-sender (contract-of)))
        (err "Project not found"))))
