/**
 * @author Fabian Piper <fabianpiper@web.de>
 */
const { FlatNode, FlatTree } = require("./tree");
const { getNested } = require("../utils");
class BoQModel extends FlatTree {
  constructor(id, name, label, date, nodes) {
    super(nodes);
    this.id = id;
    this.name = name;
    this.label = label;
    this.date = date;
  }

  static fromGAEB(boq, { billing, links }) {
    const builders = {
      "boq_body.itemlist.item": BoQItem.fromGAEB,
      "boq_body.boq_ctgy": BoQCtgy.fromGAEB,
    };

    const nodes = super.flat(
      boq.gaeb.award.boq,
      {},
      { builders, billing, links }
    );
    const info = boq.gaeb.award.boq.boq_info;
    return new BoQModel(
      boq.gaeb.award.boq.$.id,
      info.name,
      info.lbl_boq,
      new Date(info.date).toJSON(),
      nodes
    );
  }
}

class BoQCtgy extends FlatNode {
  constructor(id, r_no_part, name) {
    super();
    this.id = id;
    this.r_no_part = r_no_part;
    this.name = name;
    this.billing_item = null;
  }

  static fromGAEB(ctgy) {
    return new BoQCtgy(ctgy.$.id, ctgy.$.r_no_part, ctgy.lbl_tx.p.span);
  }
}

class BoQItem extends FlatNode {
  constructor(id, r_no_part, short_desc, long_desc, qty, qty_unit) {
    super();
    this.id = id;
    this.r_no_part = r_no_part;
    this.short_desc = short_desc;
    this.long_desc = long_desc;
    this.qty = qty;
    this.qty_unit = qty_unit;
    this.billing_item = null;
  }

  static fromGAEB(item) {
    const short_desc = getNested(
      item,
      "description",
      "outline_text",
      "outl_txt",
      "text_outl_txt",
      "p",
      "span"
    );

    const long_desc = getNested(
      item,
      "description",
      "complete_text",
      "detail_text",
      "text",
      "p",
      "span"
    );

    return new BoQItem(
      item.$.id,
      item.$.r_no_part,
      short_desc,
      long_desc,
      item.qty,
      item.qu
    );
  }
}

module.exports = BoQModel;
