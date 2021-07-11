#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { AwsPractice6Stack } from "../lib/aws-practice-6-stack";

const app = new cdk.App();
new AwsPractice6Stack(app, "AwsBackendPractice6Stack", {});
