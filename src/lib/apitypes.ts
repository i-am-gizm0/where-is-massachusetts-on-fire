export type Feature = {
	attributes: FeatureAttributes;
	geometry: {
		rings: [x: number, y: number][][];
	};
	centroid: {
		x: number;
		y: number;
	};
};
type FeatureAttributes = {
	poly_SourceOID: number | null;
	poly_IncidentName: string | null;
	poly_GISAcres: number | null;
	poly_Acres_AutoCalc: number | null;
	poly_SourceGlobalID: string;
	poly_Source: string | null;
	attr_CalculatedAcres: number | null;
	attr_ContainmentDateTime: number | null;
	attr_IncidentSize: number | null;
	attr_DiscoveryAcres: number | null;
	attr_DispatchCenterID: string | null;
	attr_EstimatedCostToDate: number | null;
	attr_FinalAcres: number | null;
	attr_FireBehaviorGeneral: string | null;
	attr_FireBehaviorGeneral1: string | null;
	attr_FireBehaviorGeneral2: string | null;
	attr_FireBehaviorGeneral3: string | null;
	attr_FireCause: string | null;
	attr_FireCauseGeneral: string | null;
	attr_FireCauseSpecific: string | null;
	attr_FireDiscoveryDateTime: number | null;
	attr_FireStrategyConfinePercent: number | null;
	attr_IncidentName: string;
	attr_IncidentShortDescription: string | null;
	attr_PercentContained: number | null;
	attr_PercentPerimToBeContained: number | null;
	attr_POOCounty: string | null;
	attr_PredominantFuelGroup: string | null;
	attr_PrimaryFuelModel: string | null;
	attr_SecondaryFuelModel: string | null;
	attr_TotalIncidentPersonnel: number | null;
	attr_UniqueFireIdentifier: string | null;
	attr_CreatedOnDateTime_dt: number | null;
	attr_ModifiedOnDateTime_dt: number | null;
};
