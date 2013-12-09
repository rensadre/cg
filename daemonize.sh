#!/bin/bash

( setsid node ./cg-engine-app-manager.js >> ./log/chat.log 2>&1 ) &