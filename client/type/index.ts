export interface ICategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    img_cover: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: string | null;
          caption: string | null;
          width: number;
          height: number;
          formats: any;
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl: string | null;
          provider: string;
          provider_metadata: any | null;
          createdAt: string;
          updatedAt: string;
        };
      };
    };
  };
}
export interface ISupplier {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
export interface IUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  phone_number: number;
  address: {
    text: string;
    code: string;
  };
  postal_code: string;
}
interface IMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
export interface IResCategory {
  data: ICategory[];
  meta: IMeta;
}
export interface IResSupplier {
  data: ISupplier[];
  meta: IMeta;
}
export interface IResProduct {
  data: IProduct[];
  meta: IMeta;
}
export interface IResSimpleProduct {
  data: IProduct;
  meta: IMeta;
}
export interface IResProductFamous {
  data: IProductFamous[];
  meta: IMeta;
}
export interface IResOrder {
  data: ISimpleOrder[];
  meta: IMeta;
}
export interface ISimpleOrder {
  id: number;
  attributes: {
    accept_time: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    order_date: string;
    status: {
      data: {
        id: number;
        attributes: {
          name: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        };
      };
    };
    order_details: {
      data: {
        id: number;
        attributes: {
          quantity: number;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        }[];
      };
    };
  };
}
export interface IProduct {
  id: number;
  attributes: {
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    price: number;
    quantity: number;
    picture_cover: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: string | null;
          caption: string | null;
          width: number;
          height: number;
          formats: {
            small: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              path: string | null;
              size: number;
              width: number;
              height: number;
            };
            thumbnail: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              path: string | null;
              size: number;
              width: number;
              height: number;
            };
          };
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl: string | null;
          provider: string;
          provider_metadata: null | any;
          createdAt: string;
          updatedAt: string;
        };
      }[];
    };
    category_id: {
      data: {
        id: number;
        attributes: {
          name: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        };
      };
    };
    supplier_id: {
      data: {
        id: number;
        attributes: {
          name: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        };
      };
    };
  };
}
export interface IProductFamous {
  id: number;
  attributes: {
    name: string;
    type: string;
    desc: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    img_cover: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: string | null;
          caption: string | null;
          width: number;
          height: number;
          formats: {
            small: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              path: string | null;
              size: number;
              width: number;
              height: number;
            };
            thumbnail: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              path: string | null;
              size: number;
              width: number;
              height: number;
            };
          };
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl: string | null;
          provider: string;
          provider_metadata: null | any;
          createdAt: string;
          updatedAt: string;
        };
      };
    };
  };
}

export interface IOrder {
  product: IProduct | null;
  quantity: number | null;
  isChecked?: boolean;
}

export interface IAOrderDetail {
  id: number;
  attributes: {
    quantity: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    product: {
      data: IProduct;
    };
  };
}
export interface IOrderDetail {
  data: IAOrderDetail[];
}
interface IAOrderServer {
  id: number;
  attributes: {
    accept_time: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    order_date: string;
    order_details: IOrderDetail;
    status: IStatus;
  };
}
export interface IResAOrderServer {
  data: IAOrderServer;
  meta: IMeta;
}

export interface IResOrderServer {
  data: IAOrderServer[];
  meta: IMeta;
}
export interface IStatus {
  data: {
    id: number;
    attributes: {
      name: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
}
export type TProvince = {
  [key: string]: {
    name: string;
    type: "quan" | "huyen";
    slug: string;
    name_with_type: string;
    code: string;
  };
};
export type ILineChart = {
  labels: string[];
  datasets: {
    fill: boolean;
    borderColor: string;
    borderWidth: number;
    borderDash: never[];
    borderDashOffset: number;
    pointBackgroundColor: string;
    pointBorderColor: string;
    pointHoverBackgroundColor: string;
    pointBorderWidth: number;
    pointHoverRadius: number;
    pointHoverBorderWidth: number;
    pointRadius: number;
    data: number[];
    tension: number;
  }[];
};
export type IDoughnutChart = {
  labels: string[];
  datasets: {
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    data: number[];
  }[];
};
