export interface RiderI {
    riderSumAssured: string;
    riderValidTill: string;
    riderFeatures: string;
    riderBenefit: string;
    riderMaxAge: string;
    benefitType: string;
    typeOfFeature: string;
}

export interface TermI {
    id?: string;
    tab: string;
    termPlan: string;
    deathBenefits:string;
    purpose: string;
    nameProposer: string,
    policyCategory: string;
    nameLifeInsurance: string;
    dob: string;
    company: string;
    plan: string;
    bankAccountHolder: string;
    clientId: string;
    policyNumber: string;
    doc: string;
    modalPremium: number;
    mode: string;
    annualPremium: number;
    policyTerm: string;
    premiumPayTerm: string;
    sumAssured: string;
    effectiveSumAssured: string;
    betterHalfBenefit: string;
    betterHalfName: string;
    betterHalfSumAssured: string;
    nominee: string;
    nomineeDob: string;
    assignedBank: string;
    apointeeName: string;
    apointeeDob: string;
    assigneeDate: string;
    rider: RiderI[];
    loan: string;
    loanAmount: string;
    endPolicyTerm: string;
    deathBenefitValue: string;
    extendedTermTenure: string;
    extendedTerm: string;
    deathBenefitsExtended: string;
    ageAtEnd: string;
    investedAmount: string;
    maturity: string;
    lastPremiumPayYear: string;
    familyAgeEndYears: string;
    ageMaturity: string;
    ageAtEndPolicyTerm: string;
    planFeatures: string;
    currentStatus: string;
    currentStatusOther: string;
    lastPremiumPaid: string;
    financialYearPurchase: string;
    currentFinancialYear: string;
    section80C: string;
    section80CPremium: string;
    section80D: string;
    section80DPremium: string;
    renewPaymentMode: string;
    bankName: string;
    taxFreeSection: string;
    taxSection: string;
    bankAccountNumber: string;
    maturityBenefit: string;
    ageAtMaturity: string;
    familyAgeLastPremiumYear: any,
    familyAgeEndPolicyTerm: any;
    neftDetails: string;
    gracePeriod: string;
}