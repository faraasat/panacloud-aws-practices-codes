#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { FrontEnd, BackEnd } from "../lib/aws-practice-30-stack";

const app = new cdk.App();
new FrontEnd(app, "Step18MultipleStacksFrontEndStack");
new BackEnd(app, "Step18MultipleStacksBackEndStack");
