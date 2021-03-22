import {createClient, defaultExchanges, subscriptionExchange} from 'urql';
import {SubscriptionClient} from "subscriptions-transport-ws";

const subscriptionClient = new SubscriptionClient(
    'ws://react.eogresources.com/graphql',
    {},
);

export const client = createClient({
  url: 'https://react.eogresources.com/graphql',
    exchanges: [
        ...defaultExchanges,
        subscriptionExchange({
            forwardSubscription: operation => subscriptionClient.request(operation),
        }),
    ],
});

export const queryHeartBeat = `
query {
  heartBeat
}
`;

export const queryGetMetrics = `
query {
  getMetrics
}
`;

export const queryGetWeatherForLocation = `
query($latLong: WeatherQuery!) {
  getWeatherForLocation(latLong: $latLong) {
    description
    locationName
    temperatureinCelsius
  }
}
`;

export const queryGetLastKnownMeasurement = `
query($metricName: String!) {
  getLastKnownMeasurement(metricName: $metricName) {
    metric
    at
    value
    unit
  }
}
`;

export const queryGetMeasurements = `
query($input: MeasurementQuery!) {
  getMeasurements(input: $input) {
    metric
    at
    value
    unit
  }
}
`;

export const queryGetMultipleMeasurement = `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      metric
      value
      at
      unit
    }
  }
}
`;
