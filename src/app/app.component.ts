import { Component } from "@angular/core";
import { PaymentService } from "./payment.service";

@Component({
	selector: "my-app",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent {
	public name = "Ipay demo";

	private data = {
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
		hsh: ""
	};
	private dataStr;

	constructor(private payment: PaymentService) {
		this.dataStr = this.createDataStr;
	}

	/* Concatenate the data into a string for hash key generation */
	get createDataStr() {
		return Object.entries(this.data).reduce((result, value) => {
			return result.concat(value[1]);
		}, "");
	}

	/* Make payment */
	pay(dataStr: string) {
		return this.payment.hash(this.dataStr).then(r => {
			if (r) {
				(this.data.cbk = "https://payments.ipayafrica.com/v3/ke"), (this.data.hsh = r);
				console.log(this.data);
				return this.payment.makePayment(this.data).subscribe(res => {
					if (res) {
						console.log(res);
					}
				});
			}
		});
	}
}
