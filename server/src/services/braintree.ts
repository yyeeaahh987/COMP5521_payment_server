import * as config from '../config';
import axios from 'axios';
import braintree from 'braintree';
import { ApiError } from './model';

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: config.BRAINTREE_MERCHANT_ID,
    publicKey: config.BRAINTREE_PUBLIC_KEY,
    privateKey: config.BRAINTREE_PRIVATE_KEY
})

export async function topUp(amount: Number): Promise<any> {
    // create transaction
    const transaction: braintree.TransactionRequest = {
        amount: String(amount),
        paymentMethodNonce: 'fake-valid-nonce',
        options: { submitForSettlement: true }
    }

    return gateway.transaction.sale(transaction)
        .then(res => {
            if (res.success) {
                console.log('Braintree successfully topped up:'
                + `\n  ID: ${res.transaction.id}`
                + `\n  Type: ${res.transaction.type}`
                + `\n  Status: ${res.transaction.status}`
                + `\n  Amount: ${res.transaction.amount}`
                + `\n  Payment Method: ${res.transaction.creditCard?.cardType} ${res.transaction.creditCard?.maskedNumber}`
                + `\n  Date: ${res.transaction.createdAt}`);

                return res.transaction;
            }
            else throw new ApiError(res.message);
        })
        .catch(err => {
            console.error(err);
            throw new ApiError('Failed to top up Braintree account');
        });
}

export function searchHistory(): any {
    // search transaction history
    return gateway.transaction.search((search: any) => {
        search.createdAt().between(new Date('2020-01-01'), new Date());
    });
}