import { Component } from "@angular/core";
import { PaymentService } from "./payment.service";
import * as CryptoJS from "crypto-js";

@Component({
	selector: "my-app",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent {
	public name = "Ipay demo";

	public data = {
		live: "0",
		oid: "112",
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
		hsh: "37ed835591e5e0a8f3f2077fd540e8daacfa6472"
	};
	private dataStr;

	constructor(private payment: PaymentService) {
		this.dataStr = this.createDataStr;
		// this.hash();
	}

	public secretKey = "demoCHANGED";

	// public hash() {
	// 	const hash = CryptoJS.HmacSHA1(this.data, this.secretKey).toString();
	// 	this.data.hsh = hash;
	// }

	/* Concatenate the data into a string for hash key generation */
	get createDataStr() {
		return Object.entries(this.data).reduce((result, value) => {
			return result.concat(value[1]);
		}, "");
	}

	pay(dataStr: string) {
		//return this.payment.makePayment(this.data);
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
}
