import { Component } from "@angular/core";
import * as CryptoJS from "crypto-js";
import { Observable, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: "my-app",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent {
	constructor() {
		this.hash();
	}

	public name = "Ipay demo";
	//Generate a random order ID each time
	public oid = Math.floor(Math.random() * 1000000);

	public data = {
		live: "0",
		oid: `${this.oid}`,
		inv: "112020102292999",
		ttl: "990",
		tel: "256712375678",
		eml: "kajuej@gmailo.com",
		vid: "demo",
		curr: "KES",
		p1: "airtel",
		p2: "020102292999",
		p3: "",
		p4: "990",
		cbk: "http://localhost:4200/",
		cst: "1",
		crl: "2",
		hsh: `${this.hash}`
	};

	public secretKey = "demoCHANGED";
	public parameters = `${this.data.live}${this.data.oid}${this.data.inv}${this.data.ttl}${this.data.tel}${this.data.eml}${this.data.vid}${this.data.curr}${this.data.p1}${this.data.p2}${this.data.p3}${this.data.p4}${this.data.cbk}${this.data.cst}${this.data.crl}`;

	//Generate the hashkey from the provided parameters
	public hash() {
		const hash = CryptoJS.HmacSHA1(this.parameters, this.secretKey).toString();
		this.data.hsh = hash;
		console.log(this.data.hsh);
	}

	//Concatenate the payment URL with the data provided, on clicking pay, it redirects to the payment page
	pay() {
		const build_query = data => {
			let str = "";
			Object.keys(data).forEach(param => {
				str += param + "=" + data[param] + "&";
			});
			return str.substring(-2);
		};
		//console.log(build_query(this.data));
		var path = "https://payments.ipayafrica.com/v3/ke?" + build_query(this.data);
		window.location.href = path;
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
