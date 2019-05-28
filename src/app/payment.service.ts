import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import * as CryptoJS from "crypto-js";

interface Ipay {
	live: string;
	oid: string;
	inv: string;
	ttl: string;
	tel: string;
	eml: string;
	vid: string;
	curr: string;
	p1: string;
	p2: string;
	p3: string;
	p4: string;
	cbk: string;
	cst: string;
	crl: string;
	hsh: string;
}

@Injectable()
export class PaymentService {
	private paymentUrl = "https://payments.ipayafrica.com/v3/ke";
	private secretKey = "demoCHANGED";
	constructor(private http: HttpClient) {}

	// public hash(dataStr: string) {
	// 	console.log(`The string to be hashed is ${dataStr}`);
	// 	var hashid = CryptoJS.HmacSHA1(dataStr, this.secretKey).toString();
	// 	console.log(`Hash ID:`, hashid);
	// 	return this.http
	// 		.post(this.paymentUrl, hashid, { responseType: "text" })
	// 		.pipe(
	// 			retry(3), // retry a failed request up to 3 times
	// 			catchError(this.handleError)
	// 		)
	// 		.toPromise();
	// }
	/* Retrieve hash */
	// public getHash(dataStr: string) {
	// 	const proxHashUrl = `${this.proxyUrl}${this.hashidUrl}`;
	// 	console.log(proxHashUrl);
	// 	const payload = `vendor=${this.vendor}&data=${dataStr}&key=${this.secretKey}`;

	// 	console.log(`Hash payload is "${payload}"`);
	// 	return this.http
	// 		.post(proxHashUrl, payload, { responseType: "text" })
	// 		.pipe(
	// 			retry(3),
	// 			catchError(this.handleError)
	// 		)
	// 		.toPromise();
	// }

	/* Actual payment */
	public makePayment(data: Ipay) {
		const parameters = `live=${data.live}&oid=${data.oid}&inv=${data.inv}&ttl=${data.ttl}&tel=${data.tel}&eml=${data.eml}&vid=${data.vid}&curr=${data.curr}&p1=${data.p1}&p2=${data.p2}&p3=${data.p3}&p4=${data.p4}&cbk=${data.cbk}&cst=${data.cst}&crl=${data.crl}&hsh=${data.hsh}`;

		const payload = `${data.live}${data.oid}${data.inv}${data.ttl}${data.tel}${data.eml}${data.vid}${data.curr}${data.p1}${data.p2}${data.p3}${data.p4}${data.cbk}${data.cst}${data.crl}${data.hsh}`;
		console.log(`The payload is ${payload}`);

		var hashid = CryptoJS.HmacSHA1(payload, this.secretKey).toString();
		console.log(`Hash ID:`, hashid);

		const params = `${parameters}${hashid}`;
		console.log(`The values passed to the URL`, params);

		return this.http.post(this.paymentUrl, params).pipe(
			retry(3),
			catchError(this.handleError)
		);
	}

	/* Error handler */
	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error("An error occurred:", error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			console.error(`Backend returned code ${error.status}, ` + `body was: ${error}`);
			console.log(error);
		}
		// return an observable with a user-facing error message
		return throwError("Something bad happened; please try again later.");
	}
}
