import { Injectable } from "@angular/core";
import { Component } from "@angular/core";
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
@Component({
	selector: "my-app",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
@Injectable()
export class PaymentService {
	private paymentUrl = "https://payments.ipayafrica.com/v3/ke";
	private secretKey = "demoCHANGED";
	constructor(private http: HttpClient) {}

	/* Actual payment */
	public makePayment(data: Ipay) {
		const parameters = `${data.live}${data.oid}${data.inv}${data.ttl}${data.tel}${data.eml}${data.vid}${data.curr}${data.p1}${data.p2}${data.p3}${data.p4}${data.cbk}${data.cst}${data.crl}${data.hsh}`;
		//hashing the parameter
		var hashid = CryptoJS.HmacSHA1(parameters, this.secretKey).toString();
		console.log(`Hash ID:`, hashid);

		//parameters including the hashkey generated
		const payload = `${data.live}${data.oid}${data.inv}${data.ttl}${data.tel}${data.eml}${data.vid}${data.curr}${data.p1}${data.p2}${data.p3}${data.p4}${data.cbk}${data.cst}${data.crl}${hashid}`;
		console.log(`The payload is ${payload}`);

		const params = {
			live: data.live,
			oid: data.oid,
			inv: data.inv,
			ttl: data.ttl,
			tel: data.tel,
			eml: data.eml,
			vid: data.vid,
			curr: data.curr,
			p1: data.p1,
			p2: data.p2,
			p3: data.p3,
			p4: data.p4,
			cbk: data.cbk,
			cst: data.cst,
			crl: data.crl,
			hsh: hashid
		};
		//const params = `${parameters}${hashid}`;
		console.log(`The values passed to the URL`, params);

		const message = console.log(`This is okay`);

		return this.http.post(this.paymentUrl, payload).pipe(
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
