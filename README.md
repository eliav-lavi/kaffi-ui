# kaffi-ui
UI for operating the local AVRO-over-Kafka producer, [`kaffi-server`](https://github.com/eliav-lavi/kaffi-server).

## Setup
1. Install dependencies using `npm install`
2. Run the app using `ng serve`
3. Navigate to `http://localhost:4200/`

## Usage
1. Make sure `kaffi-server` is up and running (see [Setup](https://github.com/eliav-lavi/kaffi-server#setup))
2. Add an AVRO schema
3. Submit a message to a topic using a selected schema

## Todo
* Design touchups
* Make added schemas available in producer box without needing to refresh the page
