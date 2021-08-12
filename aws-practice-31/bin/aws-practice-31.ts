#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { AwsPractice31Stack } from "../lib/aws-practice-31-stack";

const app = new cdk.App();
new AwsPractice31Stack(app, "AwsPractice31Stack");
