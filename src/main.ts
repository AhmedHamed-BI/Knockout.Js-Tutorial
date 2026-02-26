import * as ko from "knockout";
import { InvoiceVM } from "./view-models/invoice.vm";

const vm = new InvoiceVM();
ko.applyBindings(vm);
