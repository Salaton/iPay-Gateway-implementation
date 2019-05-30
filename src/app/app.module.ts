import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MaterialmoduleModule } from "./materialmodule/materialmodule.module";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";

@NgModule({
	imports: [HttpClientModule, BrowserModule, FormsModule, MaterialmoduleModule],
	declarations: [AppComponent, HelloComponent],
	bootstrap: [AppComponent]
})
export class AppModule {}
