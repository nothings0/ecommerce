import { IOrder, IProduct } from "@/type";
interface IOder {
  product: IProduct | null;
  quantity: number | null;
}

export function checkAndModifyArrayOrder(arr: IOder[], obj: IOder): void {
  if (arr.length === 0 && obj.quantity !== 0) {
    arr.push(obj);
    return;
  }
  let f = 0;
  const found = arr.some(function (item, index) {
    f = index;
    return item.product?.id === obj.product?.id;
  });

  if (!found) {
    arr.push(obj);
  } else {
    if (arr[f].quantity !== obj.quantity && obj.quantity !== 0) {
      arr[f].quantity = obj.quantity;
    } else {
      arr.splice(f, 1);
    }
  }
}
export function checkAndModifyArray(
  arr: IProduct[],
  obj: IProduct
): IProduct[] {
  const index = arr.findIndex((e) => e.id === obj.id);

  if (index === -1) {
    // Add the object to the array
    arr.push(obj);
  } else {
    // Remove the object from the array
    arr.splice(index, 1);
  }
  return arr;
}

export function checkContain(arr: IOrder[], obj: IProduct | null): boolean {
  const index = arr.findIndex((e) => e.product?.id === obj?.id);
  if (index === -1) {
    return false;
  } else {
    return true;
  }
}

export function fomatCurrency(x: number): string {
  return x.toLocaleString("vn-VN", { style: "currency", currency: "VND" });
}
