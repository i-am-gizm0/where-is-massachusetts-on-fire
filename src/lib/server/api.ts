import type { Feature } from '$lib/apitypes';

type APIResponse = {
	objectIdFieldName: string;
	uniqueIdField: object;
	globalIdFieldName: string;
	geometryType: string;
	spatialReference: object;
	fields: object[];
	features: Feature[];
};

export async function getGISData(): Promise<Feature[]> {
	const request = await fetch(
		'https://services3.arcgis.com/T4QMspbfLg3qTGWY/ArcGIS/rest/services/WFIGS_Interagency_Perimeters_Current/FeatureServer/0/query?where=attr_POOState%3D%27US-MA%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=poly_SourceOID%2Cpoly_IncidentName%2Cpoly_GISAcres%2Cpoly_Acres_AutoCalc%2Cpoly_SourceGlobalID%2Cpoly_Source%2Cattr_CalculatedAcres%2Cattr_ContainmentDateTime%2Cattr_IncidentSize%2Cattr_DiscoveryAcres%2Cattr_DispatchCenterID%2Cattr_EstimatedCostToDate%2Cattr_FinalAcres%2Cattr_FireBehaviorGeneral%2Cattr_FireBehaviorGeneral1%2Cattr_FireBehaviorGeneral2%2Cattr_FireBehaviorGeneral3%2Cattr_FireCause%2Cattr_FireCauseGeneral%2Cattr_FireCauseSpecific%2Cattr_FireDiscoveryDateTime%2Cattr_FireStrategyConfinePercent%2Cattr_IncidentName%2Cattr_IncidentShortDescription%2Cattr_PercentContained%2Cattr_PercentPerimToBeContained%2Cattr_POOCounty%2Cattr_PredominantFuelGroup%2Cattr_PrimaryFuelModel%2Cattr_SecondaryFuelModel%2Cattr_TotalIncidentPersonnel%2Cattr_UniqueFireIdentifier%2Cattr_CreatedOnDateTime_dt%2Cattr_ModifiedOnDateTime_dt&returnGeometry=true&returnCentroid=true&returnEnvelope=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnTrueCurves=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token='
	);
	if (!request.ok) {
		console.error(`Fetch failed (${request.status}):`, await request.text());
		throw 'remote error';
	}

	const data = (await request.json()) as APIResponse;
	return data.features;
}
