/**
 * @author Fabian Piper <fabianpiper@web.de>
 */
const { FlatNode, FlatTree } = require("./tree");

class LinkModel extends FlatTree {
  constructor(nodes) {
    super(nodes);
  }

  static fromXml(links) {
    const builders = {
      "bu_items.item_link.bu_sub_items.item_link": Link.fromItem,
      bu_link: Link.fromSection,
    };
    const nodes = super.flat(links.billing_model_link, {}, { builders });
    return new LinkModel(nodes);
  }
}

class Link extends FlatNode {
  constructor(id, link) {
    super();
    this.id = id;
    this.link = link;
  }

  static fromSection(section) {
    const link = new Link(section.bu_items.item_link.bu_item_id, section.bu_id);
    return link;
  }

  static fromItem(item) {
    return new Link(item.bu_item_id, item.bu_item_id);
  }
}

module.exports = LinkModel;
