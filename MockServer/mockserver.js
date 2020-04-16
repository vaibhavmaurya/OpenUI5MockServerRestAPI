sap.ui.define([
	"sap/ui/core/util/MockServer",
	"sap/base/Log",
	"sap/ui/model/json/JSONModel"
], function (MockServer, Log, JSONModel) {
	"use strict";

	return {
		/**
		 * Initializes the mock server.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @public
		 */
		init: function () {
			// create
			var fStartMockServer = function (oData) {
				var aQueries = oData["service_calls"],
					aRequests = [];
				aQueries.forEach(function (o) {
					aRequests.push({
						method: o.method,
						path: new RegExp(o.path),
						response: function (oXhr, sUrlParams) {
							oXhr.respondJSON(o.status, {}, JSON.stringify(o.response));
							return true;
						}
					});
				});
				var oMockServer = new MockServer({
					rootUri: "/geolocation/geolocation/v1/",
					requests: aRequests
				});
				oMockServer.start();
				Log.info("Running the app with mock data");
			};

			$.getJSON("./MockedData.json").done(fStartMockServer);
			// var oMockServer = new MockServer({
			// 	rootUri: "/geolocation/geolocation/v1/",
			// 	requests: [that.oSpaces, that.oSpacesHierarchy]
			// });
			// oMockServer.start();
		}

	};

});
