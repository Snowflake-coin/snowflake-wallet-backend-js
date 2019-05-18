// Copyright (c) 2018, Zpalmtree
//
// Please see the included LICENSE file for more information.

import * as fs from 'fs';
import { WalletError, WalletErrorCode } from './WalletError';
import { decryptWalletFromBuffer } from './DecryptWallet';

/**
 * Open the wallet from the given filename with the given password and return
 * a JSON string. Uses pbkdf2 encryption, not the same as turtle-service
 *
 * Returns the JSON, and an error. If error is not undefined, the JSON will
 * be an empty string.
 */
export function openWallet(filename: string, password: string): [string, WalletError | undefined] {
    let data: Buffer;

    try {
        data = fs.readFileSync(filename);
    } catch (err) {
        return ['', new WalletError(WalletErrorCode.FILENAME_NON_EXISTENT, err.toString())];
    }

    return decryptWalletFromBuffer(data, password);
}
