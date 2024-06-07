/**
 * @description 提取菜单树中的每一项uniqueId
 * @param tree 树
 * @returns 每一项uniqueId组成的数组
 */
export const extractPathList = (tree: any[]): any => {
  // 检查树是否为数组，如果不是则发出警告并返回空数组
  if (!Array.isArray(tree)) {
    console.warn("tree must be an array");
    return [];
  }
  // 如果树为空，则直接返回空数组
  if (!tree || tree.length === 0) return [];
  // 存储每个节点的uniqueId的数组
  const expandedPaths: Array<number | string> = [];
  // 遍历树中的每个节点
  for (const node of tree) {
    // 判断当前节点是否有子节点
    const hasChildren = node.children && node.children.length > 0;
    // 如果有子节点，则递归调用提取函数
    if (hasChildren) {
      extractPathList(node.children);
    }
    // 将当前节点的uniqueId添加到数组中
    expandedPaths.push(node.uniqueId);
  }
  // 返回所有节点的uniqueId组成的数组
  return expandedPaths;
};

/**
 * @description 如果父级下children的length为1，删除children并自动组建唯一uniqueId
 * @param tree 树
 * @param pathList 每一项的id组成的数组
 * @returns 组件唯一uniqueId后的树
 */
export const deleteChildren = (tree: any[], pathList = []): any => {
  // 检查树是否为数组，如果不是则发出警告并返回空数组
  if (!Array.isArray(tree)) {
    console.warn("menuTree must be an array");
    return [];
  }
  // 如果树为空，则直接返回空数组
  if (!tree || tree.length === 0) return [];
  // 遍历树中的每个节点
  for (const [key, node] of tree.entries()) {
    // 如果当前节点的children长度为1，则删除children属性
    if (node.children && node.children.length === 1) delete node.children;
    // 添加id和parentId属性
    node.id = key;
    node.parentId = pathList.length ? pathList[pathList.length - 1] : null;
    // 构建pathList
    node.pathList = [...pathList, node.id];
    // 构建uniqueId
    node.uniqueId =
      node.pathList.length > 1 ? node.pathList.join("-") : node.pathList[0];
    // 判断当前节点是否有子节点，如果有则递归调用删除函数
    const hasChildren = node.children && node.children.length > 0;
    if (hasChildren) {
      deleteChildren(node.children, node.pathList);
    }
  }
  // 返回处理后的树
  return tree;
};

/**
 * @description 创建层级关系
 * @param tree 树
 * @param pathList 每一项的id组成的数组
 * @returns 创建层级关系后的树
 */
export const buildHierarchyTree = (tree: any[], pathList = []): any => {
  // 检查树是否为数组，如果不是则发出警告并返回空数组
  if (!Array.isArray(tree)) {
    console.warn("tree must be an array");
    return [];
  }
  // 如果树为空，则直接返回空数组
  if (!tree || tree.length === 0) return [];
  // 遍历树中的每个节点
  for (const [key, node] of tree.entries()) {
    // 添加id和parentId属性
    node.id = key;
    node.parentId = pathList.length ? pathList[pathList.length - 1] : null;
    // 构建pathList
    node.pathList = [...pathList, node.id];
    // 判断当前节点是否有子节点，如果有则递归调用构建函数
    const hasChildren = node.children && node.children.length > 0;
    if (hasChildren) {
      buildHierarchyTree(node.children, node.pathList);
    }
  }
  // 返回处理后的树
  return tree;
};

/**
 * @description 广度优先遍历，根据唯一uniqueId找当前节点信息
 * @param tree 树
 * @param uniqueId 唯一uniqueId
 * @returns 当前节点信息
 */
export const getNodeByUniqueId = (
  tree: any[],
  uniqueId: number | string
): any => {
  // 检查树是否为数组，如果不是则发出警告并返回空数组
  if (!Array.isArray(tree)) {
    console.warn("menuTree must be an array");
    return [];
  }
  // 如果树为空，则直接返回空数组
  if (!tree || tree.length === 0) return [];
  // 查找指定uniqueId的节点
  const item = tree.find(node => node.uniqueId === uniqueId);
  // 如果找到了节点，则返回节点信息
  if (item) return item;
  // 如果未找到，继续在子节点中查找
  const childrenList = tree
    .filter(node => node.children)
    .map(i => i.children)
    .flat(1) as unknown;
  return getNodeByUniqueId(childrenList as any[], uniqueId);
};

/**
 * @description 向当前唯一uniqueId节点中追加字段
 * @param tree 树
 * @param uniqueId 唯一uniqueId
 * @param fields 需要追加的字段
 * @returns 追加字段后的树
 */
export const appendFieldByUniqueId = (
  tree: any[],
  uniqueId: number | string,
  fields: object
): any => {
  // 检查树是否为数组，如果不是则发出警告并返回空数组
  if (!Array.isArray(tree)) {
    console.warn("menuTree must be an array");
    return [];
  }
  // 如果树为空，则直接返回空数组
  if (!tree || tree.length === 0) return [];
  // 遍历树中的每个节点
  for (const node of tree) {
    // 判断当前节点是否有子节点
    const hasChildren = node.children && node.children.length > 0;
    // 如果当前节点的uniqueId与指定的相同，并且fields为对象，则向节点中追加字段
    if (
      node.uniqueId === uniqueId &&
      Object.prototype.toString.call(fields) === "[object Object]"
    )
      Object.assign(node, fields);
    // 如果有子节点，则递归调用追加字段函数
    if (hasChildren) {
      appendFieldByUniqueId(node.children, uniqueId, fields);
    }
  }
  // 返回处理后的树
  return tree;
};

/**
 * 根据返回数据的status字段值判断追加是否禁用disabled字段，返回处理后的树结构，用于上级部门级联选择器的展示
 *（实际开发中也是如此，不可能前端需要的每个字段后端都会返回，这时需要前端自行根据后端返回的某些字段做逻辑处理）
 * 这个是pure作者留下的例子， 也可以通过设置disabled 对应的字段来实现 比如disabled: 'status' (需要后端的字段为true/false)
 * @param treeList
 * @param field 根据哪个字段来设置disabled
 * @returns
 */
export function setDisabledForTreeOptions(treeList, field) {
  if (!treeList || !treeList.length) return;
  const newTreeList = [];
  for (let i = 0; i < treeList.length; i++) {
    treeList[i].disabled = treeList[i][field] === 0 ? true : false;
    setDisabledForTreeOptions(treeList[i].children, field);
    newTreeList.push(treeList[i]);
  }
  return newTreeList;
}

/**
 * @description 构造树型结构数据
 * @param data 数据源
 * @param id id字段 默认id
 * @param parentId 父节点字段，默认parentId
 * @param children 子节点字段，默认children
 * @returns 追加字段后的树
 */
export const handleTree = (
  data: any[],
  id?: string,
  parentId?: string,
  children?: string
): any => {
  // 检查数据是否为数组，如果不是则发出警告并返回空数组
  if (!Array.isArray(data)) {
    console.warn("data must be an array");
    return [];
  }
  // 定义默认字段名
  const config = {
    id: id || "id",
    parentId: parentId || "parentId",
    childrenList: children || "children"
  };
  // 创建空对象存储子节点列表和节点id
  const childrenListMap: any = {};
  const nodeIds: any = {};
  const tree = [];
  // 遍历数据源中的每个节点
  for (const d of data) {
    const parentId = d[config.parentId];
    // 如果子节点列表不存在，则创建一个空数组
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    // 存储节点id和节点信息
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }
  // 构建树形结构
  for (const d of data) {
    const parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }
  // 适配子节点列表
  for (const t of tree) {
    adaptToChildrenList(t);
  }
  // 递归函数，适配子节点列表
  function adaptToChildrenList(o: Record<string, any>) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  // 返回处理后的树形结构数据
  return tree;
};
export interface Tree {
  children?: this[];
}

/**
 * @description 将扁平的数据转换为树形结构
 * @param src 数据源
 * @param keyField 树节点的唯一标识字段
 * @param parentField 树节点的父节点标识字段
 * @returns 转换后的树形结构数据
 */
export function toTree<T extends Tree>(
  src: T[],
  keyField: keyof T,
  parentField: keyof T
): T[] {
  // 创建映射，用于快速查找节点
  const map = new Map<unknown, T>(src.map(it => [it[keyField], it]));
  // 遍历数据源，构建树形结构
  src.forEach(it => {
    if (map.has(it[parentField])) {
      const parent = map.get(it[parentField])!;
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(it);
    }
  });
  // 返回根节点
  return src.filter(it => !it[parentField]);
}
