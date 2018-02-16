// Copyright 2017 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.quarter_hourly_job =
  functions.pubsub.topic('quarter-hourly-tick').onPublish((event) => {
    const payload = {
      'notification': {
        'title': 'TimeCheck',
        'body': 'quarter-hourly-tick',
      },
      // NOTE: The 'data' object is inside payload, not inside notification
      'data': {
            'featureName': 'time check'
      }
    };
    return admin.messaging().sendToTopic("quarter-hourly-tick", payload);

    console.log("This job and message go out every quarter hour!")
  });

exports.hourly_job =
  functions.pubsub.topic('hourly-tick').onPublish((event) => {
    console.log("This job is run every hour!")
  });
