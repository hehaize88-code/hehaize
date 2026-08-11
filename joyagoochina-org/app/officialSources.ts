export type OfficialSource = {
  title: string;
  href: string;
};

export const officialSourcesCheckedAt = "2026-08-11";

const officialSources = {
  shoppingGuidance: {
    title: "JoyaGoo Shopping Guidance",
    href: "https://mgt.joyagoo.com/help-center/shopping-assistant-guidance/",
  },
  returnPolicy: {
    title: "JoyaGoo Return Policy",
    href: "https://mgt.joyagoo.com/help-center/terms-of-promised-returns-with-no-reasons/",
  },
  valueAddedServices: {
    title: "JoyaGoo Value Added Services",
    href: "https://mgt.joyagoo.com/help-center/value-added-services/",
  },
  storagePeriod: {
    title: "JoyaGoo Warehouse Storage Period",
    href: "https://mgt.joyagoo.com/help-center/how-long-can-the-goods-be-stored-in-the-joyagoo-warehouse/",
  },
  orderStatuses: {
    title: "JoyaGoo Shopping Agent Order Statuses",
    href: "https://mgt.joyagoo.com/help-center/status-of-the-shopping-agent-orders/",
  },
  feeExplanation: {
    title: "JoyaGoo Shopping Agent Fee Explanation",
    href: "https://mgt.joyagoo.com/help-center/how-does-shopping-agent-service-charge/",
  },
  volumetricWeight: {
    title: "JoyaGoo Actual and Volumetric Weight",
    href: "https://mgt.joyagoo.com/help-center/actual-weight-and-volumetric-weight/",
  },
  rehearsalPacking: {
    title: "JoyaGoo Rehearsal Packing",
    href: "https://mgt.joyagoo.com/help-center/joyabuy-rehearsal-packing/",
  },
} satisfies Record<string, OfficialSource>;

const sourceKeysByRoute: Record<
  string,
  Array<keyof typeof officialSources>
> = {
  "how-to-buy": ["shoppingGuidance", "returnPolicy", "orderStatuses"],
  "qc-guide": ["shoppingGuidance", "returnPolicy", "valueAddedServices"],
  "shipping-guide": [
    "shoppingGuidance",
    "valueAddedServices",
    "volumetricWeight",
    "rehearsalPacking",
    "storagePeriod",
  ],
  returns: ["returnPolicy", "storagePeriod", "orderStatuses"],
  "how-to-buy-from-taobao-with-joyagoo": [
    "shoppingGuidance",
    "returnPolicy",
    "orderStatuses",
    "storagePeriod",
  ],
  "joyagoo-fees-explained": [
    "feeExplanation",
    "shoppingGuidance",
    "valueAddedServices",
    "returnPolicy",
  ],
  "joyagoo-parcel-consolidation-packaging-guide": [
    "shoppingGuidance",
    "valueAddedServices",
    "volumetricWeight",
    "rehearsalPacking",
  ],
  "joyagoo-qc-photo-checklist": [
    "shoppingGuidance",
    "returnPolicy",
    "valueAddedServices",
  ],
  "joyagoo-return-window-warehouse-storage": [
    "returnPolicy",
    "storagePeriod",
    "valueAddedServices",
    "orderStatuses",
  ],
  "joyagoo-volumetric-weight-shipping-cost": [
    "volumetricWeight",
    "rehearsalPacking",
    "shoppingGuidance",
    "valueAddedServices",
  ],
};

export const getOfficialSources = (slug: string): OfficialSource[] =>
  (sourceKeysByRoute[slug] ?? ["shoppingGuidance"]).map(
    (key) => officialSources[key],
  );
