// CalculateEstateDutyTax.js

export function calculateEstateDutyTax(purchaser, purchaseTransaction) {
  const {
    isFirstProperty,
    isSriLankanResident,
    isCompany
  } = purchaser;

  const {
    type,
    consideration,
    effectiveDate
  } = purchaseTransaction;

  console.log(isFirstProperty)
  console.log(consideration)
  // Get the current date
  const currentDate = new Date();

  // Calculate the threshold date which is 14 days before the current date
  const thresholdDate = new Date(
    currentDate.getTime() - 14 * 24 * 60 * 60 * 1000
  );

  // If the effective date is before the threshold date, penalty applies
  const penaltyApplies = effectiveDate < thresholdDate;

  // Calculate the number of days past the threshold date if penalty applies
  const daysPastThreshold = penaltyApplies
    ? Math.floor((thresholdDate - effectiveDate) / (24 * 60 * 60 * 1000))
    : 0;

  // Penalty calculation (flat 5,000 per day past threshold)
  const penalty = daysPastThreshold * 1000;

  let tax = 0;

  // Logic for different combinations (consideration ranges are examples, adjust as needed)
  if (isFirstProperty && isSriLankanResident && !isCompany) {
    if (consideration <= 3750000) {
      tax = 0;
    } else if (consideration <= 9000000) {
      tax = consideration * 0.02;
    } else if (consideration <= 20000000) {
      tax = consideration * 0.03;
    } else {
      tax = consideration * 0.05;
    }
  } else if (!isFirstProperty && isSriLankanResident && !isCompany) {
    // Adjust tax rates for non-first property (example)
    tax = consideration * 0.1; // Replace with your logic
  } else if (isFirstProperty && !isSriLankanResident && !isCompany) {
    // Adjust tax rates for non-resident (example)
    tax = consideration * 0.15; // Replace with your logic
  } else if (!isFirstProperty && !isSriLankanResident && !isCompany) {
    // Adjust tax rates for non-resident, non-first property (example)
    tax = consideration * 0.2; // Replace with your logic
  } else if (isCompany) {
    // Adjust tax rates for companies (example)
    tax = consideration * 0.3; // Replace with your logic
  }

  // Total tax amount (including penalty)
  const totalTax = tax + penalty;

  return { tax, penalty, totalTax };
}
