export type TApiAddress = {
  // Name of the building (if applicable), e.g. "The Old Post Office"
  building_name: string;
  // Building number as a string so non-numeric values are preserved, e.g. "12A"
  building_number: string;
  // Country name or code
  country: string;
  // County / administrative area
  county: string;
  // Department within an organisation, e.g. "Sales"
  department_name: string;
  // Dependent locality (smaller area within a town)
  dependant_locality: string;
  // Dependent thoroughfare (street within a dependent locality)
  dependant_thoroughfare: string;
  // District / local authority area
  district: string;
  // Additional dependent locality field
  double_dependant_locality: string;
  // Eastings coordinate (Ordnance Survey) as string
  eastings: string;
  // Unique GUID for the address record
  guid: string;
  // Latitude coordinate as string
  latitude: string;
  // First address line (primary street/number)
  line_1: string;
  // Second address line (optional)
  line_2: string;
  // Third address line (optional)
  line_3: string;
  // Longitude coordinate as string
  longitude: string;
  // Northings coordinate (Ordnance Survey) as string
  northings: string;
  // Organisation name if the address belongs to a business
  organisation_name: string;
  // PO Box number if applicable
  po_box: string;
  // Post town (e.g. "Birmingham")
  post_town: string;
  // Full postcode (inward + outward), e.g. "B1 1AA"
  postcode: string;
  // Inward part of postcode (last 3 chars)
  postcode_inward: string;
  // Outward part of postcode (first part)
  postcode_outward: string;
  // Premise (flat/room/plot) information
  premise: string;
  // Single-line human-friendly summary of the address
  summary_line: string;
  // Thoroughfare / street name
  thoroughfare: string;
  // Unique Delivery Point Reference Number (UDPRN) as string
  udprn: string;
  // Unique Multiple Residence Property Number (UMPRN) as string
  umprn: string;
  // Electoral ward name
  ward: string;
};
