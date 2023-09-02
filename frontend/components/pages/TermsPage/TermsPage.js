import styles from "./TermsPage.module.scss";

const TermsPage = () => {
  return (
    <div className={styles.termsPage}>
      <h4>Terms and Conditions</h4>
      <h4>Owner Rights & Provisions</h4>
      <div className={styles.content}>
        a. The Owner is the registered owner of the Property.
      </div>
      <div className={styles.content}>
        b. Cocoon Luxury Properties Pty Ltd is authorized by the Property Owner
        to allow the Guest to occupy and use the premises for accommodation,
        photoshoots and events as per the terms of the contract. The terms of
        the booking are between the guest and Cocoon Luxury Properties.
      </div>
      <div className={styles.content}>
        c. The guest is authorized to occupy the property during the agreed
        period as set out in the Booking Summary. The guest is not a tenant of
        the Property and has been granted exclusive possession of the Property.
      </div>
      <div className={styles.content}>
        d. The contract of accommodation shall not be effective until Cocoon
        Luxury Properties sends the Guest a written confirmation of the booking.
        The Guest acknowledges that Cocoon Luxury Properties acts as a booking
        agent for the Owner only and not as a principal.
      </div>

      <h4>Deposits</h4>
      <div className={styles.content}>
        A 50% deposit is required at the time of booking to confirm the booking.
        A booking is not confirmed unless we have physically received 50% of the
        rental amount into our bank account.
      </div>
      <div className={styles.content}>
        Remaining balance of the rental amount including the security deposit
        (bon ), is due 60 (sixty days prior to arrival).
      </div>

      <h4>Cancellations</h4>
      <div className={styles.content}>
        <b>Cancellation made more than 60 days prior to arrival:</b> In case of
        cancellation the initial payment will be lost.
      </div>
      <div className={styles.content}>
        <b>Cancellation made less that 60 days prior to arrival:</b> The overall
        cost will be lost and due.
      </div>

      <div className={styles.content}>
        If a guest cancels their booking after payment has been taken, the guest
        will forfeit any credit card fees that have been charged.
      </div>
      <div className={styles.content}>
        Please Note: All debit/credit card transactions have a non-refundable 4%
        merchant fee.
      </div>
    </div>
  );
};

export default TermsPage;
