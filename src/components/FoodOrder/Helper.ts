import React from "react";

export const getUtcTimeDifference = (date: string) => {
  var currentDate = new Date();
  var utcHours = currentDate.getUTCHours();
  var utcMinutes = currentDate.getUTCMinutes();
  var utcSeconds = currentDate.getUTCSeconds();
  var timeInMillis =
    utcHours * 60 * 60 * 1000 + utcMinutes * 60 * 1000 + utcSeconds * 1000;

  var expires = new Date(date);
  var expiresHours = expires.getUTCHours();
  var expiresMinutes = expires.getUTCMinutes();
  var expiresSeconds = expires.getUTCSeconds();
  var expiresInMillis =
    expiresHours * 60 * 60 * 1000 +
    expiresMinutes * 60 * 1000 +
    expiresSeconds * 1000;
  return expiresInMillis - timeInMillis;
};
