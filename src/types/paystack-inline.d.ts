/**
 * @paystack/inline-js ships without types. These cover the parts this site
 * uses, written against the package's own README (version 2.26).
 */
declare module "@paystack/inline-js" {
  export interface PaystackCustomField {
    display_name: string;
    variable_name: string;
    value: string;
  }

  export interface PaystackSuccess {
    id: number;
    reference: string;
    message: string;
  }

  export interface PaystackTransactionOptions {
    key: string;
    email: string;
    /** In the currency's smallest unit: pesewas for GHS. */
    amount: number;
    currency?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    channels?: string[];
    reference?: string;
    metadata?: {
      custom_fields?: PaystackCustomField[];
      [key: string]: unknown;
    };
    onSuccess?: (transaction: PaystackSuccess) => void;
    onCancel?: () => void;
    onLoad?: (response: { id: number; accessCode: string }) => void;
    onError?: (error: { message: string }) => void;
  }

  export default class PaystackPop {
    newTransaction(options: PaystackTransactionOptions): unknown;
    /** Closes the active transaction when no matching id is given. */
    cancelTransaction(transaction?: unknown): void;
    isLoaded(): boolean;
  }
}
