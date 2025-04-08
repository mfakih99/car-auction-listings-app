import React, { useState, useEffect } from "react";

// Component to display a single car auction listing
function CarListingItem({ item }) {
  // Use optional chaining to safely access nested properties.
  const description =
    item.designatedDescriptionEnrichment?.manheimStandardDescription?.shortDescription ||
    "No description available";
  const mainImage = item.mainImage?.smallUrl || "https://via.placeholder.com/150";
  const year = item.year || "N/A";
  const make = item.make || "Unknown";
  const odometer = item.odometer;
  const odometerUnits = item.odometerUnits || "";
  const auctionName = item.auctionName;
  const mmrPrice = item.mmrPrice;
  const auctionEndTime = item.auctionEndTime;

  return (
    <div className="car-listing-item" style={styles.listingItem}>
      <img src={mainImage} alt={description} style={styles.image} />
      <div style={styles.info}>
        <h2 style={styles.title}>{description}</h2>
        <p>
          <strong>Auction:</strong> {auctionName}
        </p>
        <p>
          <strong>Year/Make:</strong> {year} {make}
        </p>
        <p>
          <strong>Odometer:</strong> {odometer} {odometerUnits}
        </p>
        <p>
          <strong>MMR Price:</strong> ${mmrPrice}
        </p>
        <p>
          <strong>Auction Ends:</strong>{" "}
          {auctionEndTime ? new Date(auctionEndTime).toLocaleString() : "N/A"}
        </p>
      </div>
    </div>
  );
}

function App() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Define the payload as in your curl command.
  const payload = {
    "statusIds": [
      "00000000-0000-1000-0000-000000050083",
      "00000000-0000-1000-0000-000000050084"
    ],
    "excludeFilters": ["sellerNames"],
    "inventorySourceIds": ["00000000-0000-1000-0000-200000000003"],
    "sellerTypes": [
      "Auction",
      "Bank",
      "Captive Finance",
      "Car Rental",
      "Car Sharing",
      "Credit Union",
      "Factory",
      "Finance",
      "Fleet/Lease",
      "Floorplan Agency",
      "Franchise",
      "Government Agency",
      "Insurance",
      "Lease",
      "Non-profit",
      "Non-Profit",
      "Other",
      "Third Party Remarketer",
      "Title Loan",
      "Transporter",
      "Truck Rental",
      "Not Specified"
    ],
    "showOnlyHiddenListings": false,
    "showOnlyWorkbookListings": false,
    "showOnlyMyHighBids": false,
    "includeTestData": false,
    "limit": 100,
    "sortOptions": "firstTimeListed:desc,createdAt:desc,sellerRating:desc,years:desc,makes:asc,models:asc,odometer:asc",
    "includeAllListings": true,
    "includeAllFields": false,
    "includeNotes": true,
    "fields": [
      "auctionEndTime",
      "auctionStartTime",
      "bidCount",
      "bidPrice",
      "buyNowPrice",
      "comments",
      "conditionGrade",
      "driveTrain",
      "engineType",
      "eventSaleName",
      "exteriorColor",
      "facilitationLocation",
      "interiorColor",
      "inventorySource",
      "laneNumber",
      "make",
      "mmrPrice",
      "odometer",
      "odometerUnits",
      "pickupLocation",
      "runNumber",
      "sellerName",
      "sourceMake",
      "sourceModel",
      "sourceTrim",
      "sourceYear",
      "statuses",
      "transmission",
      "unifiedId",
      "vin",
      "year",
      "allowBids",
      "allowBuyNow",
      "arbitrationRating",
      "asIs",
      "auctionId",
      "auctionName",
      "autocheck",
      "biddable",
      "buyable",
      "canTakeOffers",
      "carfaxAccountNumber",
      "channelIds",
      "channels",
      "closedSale",
      "conditionReportUrl",
      "consignorId",
      "designatedDescriptionEnrichment",
      "detailPageUrl",
      "doorCount",
      "engineDisplacement",
      "engineFuelType",
      "equipment",
      "evBatteryHealthEnrichment",
      "eventSaleId",
      "exteriorColorIds",
      "facilitationLocationIds",
      "firstTimeListed",
      "floorPriceMessage",
      "hasFrameDamage",
      "hasPriorPaint",
      "hasSellerDisclosure",
      "id",
      "ifsConsignmentId",
      "interiorType",
      "inventorySourceIds",
      "isAutoGradeOrManheimGrade",
      "isCertified",
      "isDrivable",
      "isInfinite",
      "isManheimFacilitated",
      "isTra",
      "mainImage",
      "mid",
      "oveListingId",
      "partnerWebsiteName",
      "pickupRegionIds",
      "portfolio",
      "previouslyCanadianListing",
      "promotions",
      "sale",
      "saleChannelName",
      "saleDate",
      "saleIds",
      "salesRating",
      "salvageVehicle",
      "sblu",
      "sellerDisclosureUrl",
      "sellerNumber",
      "sellerRating",
      "sold",
      "source",
      "startingBidPrice",
      "statusIds",
      "titleState",
      "titleStatus",
      "topTypeIds",
      "totalSales",
      "unsoldRating",
      "valuationsMmr",
      "vehicleLocationDescription",
      "wsUrl",
      "disclosureId"
    ],
    "includeFilters": true,
    "includeFacets": false,
    "facets": [
      "facilitationLocations",
      "makes",
      "models",
      "pickupLocationStates",
      "atAuction",
      "closedSales",
      "driveTrains",
      "engineFuelTypes",
      "engineTypes",
      "equipments",
      "exteriorColors",
      "hasFrameDamage",
      "hasPriorPaint",
      "hasEvBatteryHealth",
      "interiorColors",
      "interiorTypes",
      "inventorySources",
      "laneNumbers",
      "manufacturerExteriorColors",
      "manufacturerInteriorColors",
      "odometerCheckOK",
      "passengerCapacities",
      "pickupRegions",
      "portfolios",
      "previouslyCanadianListings",
      "promotions",
      "saleDates",
      "sellerTypes",
      "titleAndProblemCheckOK",
      "titleBrandings",
      "titleStates",
      "titleStatuses",
      "topTypes",
      "transmissions",
      "trims",
      "vehicleSubTypes",
      "vehicleUseAndEventCheckOK",
      "asIsVehicles",
      "isTra",
      "salvageVehicles",
      "biddable",
      "buyable",
      "canTakeOffers",
      "startBidEqualsFloor",
      "floorPriceMessages",
      "conditionTypes",
      "showOnlyAutogrades",
      "sellerNames",
      "sellerCommercialNames"
    ],
    "executeNow": true
  };

  useEffect(() => {
    fetch("https://api.manheim.com/searches", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.manheim.v11+json",
        "Accept-Language": "en-US,en;q=0.9",
        "Authorization": "Bearer q6xskdpq8yarz6q9w4ruu2h6",
        "Content-Type": "application/vnd.manheim.v11+json",
        "Origin": "https://search.manheim.com",
        "Priority": "u=1, i",
        "Referer": "https://search.manheim.com/",
        "sec-ch-ua": '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-source-env": "production"
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Assume the API returns an object with an "items" array containing the car listings.
        setListings(data.items);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={styles.container}>Loading car listings...</div>;
  }

  if (error) {
    return <div style={styles.container}>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Car Auction Listings</h1>
      <div style={styles.listings}>
        {listings.map((item) => (
          <CarListingItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "960px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "sans-serif"
  },
  header: {
    textAlign: "center",
    marginBottom: "40px"
  },
  listings: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px"
  },
  listingItem: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    width: "calc(50% - 20px)",
    boxSizing: "border-box",
    display: "flex"
  },
  image: {
    width: "150px",
    height: "auto",
    marginRight: "15px"
  },
  info: {
    flex: 1
  },
  title: {
    margin: "0 0 10px"
  }
};

export default App;
