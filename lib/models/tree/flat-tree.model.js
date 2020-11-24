const { reduceByKey } = require("../../utils");

/**
 * @author Fabian Piper <fabianpiper@web.de>
 */
class FlatTree {
  constructor(nodes) {
    this.nodes = nodes;
  }

  static flat(
    tree,
    collection,
    { builders, parent, billing, links, selector = "id" }
  ) {
    for (const key in builders) {
      const _desc = reduceByKey(key, tree);
      if (_desc) {
        const desc = Array.isArray(_desc) ? _desc : Array.of(_desc); // xml2js parser transforms arrays with one entry to object
        for (let i = 0; i < desc.length; i++) {
          const node = builders[key](desc[i]);
          collection[node[selector]] = node;
          if (parent) {
            node.parent = parent;
            collection[parent].children.push(node[selector]);
          }
          if (billing && links) {
            const ref = links.nodes[node.id];
            if (ref) {
              const item = billing.nodes[ref.link];
              if (item) node.billing_item = item;
            }
          }
          this.flat(desc[i], collection, {
            builders,
            parent: node[selector],
            billing,
            links,
            selector,
          });
        }
      }
    }
    return collection;
  }
}

module.exports = FlatTree;
