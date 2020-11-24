/**
 * @author Fabian Piper <fabianpiper@web.de>
 */
const { FlatNode, FlatTree } = require("./tree");

class BillingModel extends FlatTree {
  constructor(currency, nodes) {
    super(nodes);
    this.currency = currency;
  }

  static fromXml(billing) {
    const builders = {
      billing_unit: BillingUnit.fromXml,
      "items.item": BillingItem.fromXml,
      "sub_items.item": BillingItem.fromXml,
    };
    const nodes = super.flat(billing.billing_model, {}, { builders });
    return new BillingModel(billing.billing_model.bm_info.currency, nodes);
  }
}

class BillingUnit extends FlatNode {
  constructor(
    id,
    short_description,
    long_description,
    total_quantities,
    unit,
    total_price,
    completion_date
  ) {
    super();
    this.id = id;
    this.short_description = short_description || "";
    this.long_description = long_description || "";
    this.total_quantities = total_quantities;
    this.unit = unit;
    this.total_price = parseFloat(total_price);
    this.completion_date = completion_date;
  }

  static fromXml(unit) {
    return new BillingUnit(
      unit.$.id,
      unit.short_description.span,
      unit.long_description.span,
      unit.total_quantities,
      unit.unit,
      unit.total_price,
      unit.completion_date
    );
  }
}

class BillingItem extends FlatNode {
  constructor(id, qty, qty_unit, price, r_no_part_qty_split, short_desc) {
    super();
    this.id = id;
    this.qty = qty;
    this.qty_unit = qty_unit;
    this.price = parseFloat(price);
    this.r_no_part_qty_split = r_no_part_qty_split;
    this.short_desc = short_desc;
  }

  static fromXml(item) {
    return new BillingItem(
      item.$.id,
      item.quantities,
      item.unit,
      item.price,
      item.r_no_part_qty_split,
      item.short_des_linked_ifc
    );
  }
}

module.exports = BillingModel;
