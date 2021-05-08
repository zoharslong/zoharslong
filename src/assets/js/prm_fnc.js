/* eslint-disable */
function isMergeableObject(val) {
  let nonNullObject = val && typeof val === "object";
  return (
    nonNullObject &&
    Object.prototype.toString.call(val) !== "[object RegExp]" &&
    Object.prototype.toString.call(val) !== "[object Date]"
  );
}
function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}
function cloneIfNecessary(value, optionsArgument) {
  let clone = optionsArgument && optionsArgument.clone === true;
  return clone && isMergeableObject(value)
    ? deepmerge(emptyTarget(value), value, optionsArgument)
    : value;
}
function defaultArrayMerge(target, source, optionsArgument) {
  let destination = target.slice();
  source.forEach(function (e, i) {
    if (typeof destination[i] === "undefined") {
      destination[i] = cloneIfNecessary(e, optionsArgument);
    } else if (isMergeableObject(e)) {
      destination[i] = deepmerge(target[i], e, optionsArgument);
    } else if (target.indexOf(e) === -1) {
      destination.push(cloneIfNecessary(e, optionsArgument));
    }
  });
  return destination;
}
function mergeObject(target, source, optionsArgument) {
  let destination = {};
  if (isMergeableObject(target)) {
    Object.keys(target).forEach(function (key) {
      destination[key] = cloneIfNecessary(target[key], optionsArgument);
    });
  }
  Object.keys(source).forEach(function (key) {
    if (!isMergeableObject(source[key]) || !target[key]) {
      destination[key] = cloneIfNecessary(source[key], optionsArgument);
    } else {
      destination[key] = deepmerge(target[key], source[key], optionsArgument);
    }
  });
  return destination;
}
function deepmerge(target, source, optionsArgument) {
  let array = Array.isArray(source);
  let options = optionsArgument || { arrayMerge: defaultArrayMerge };
  let arrayMerge = options.arrayMerge || defaultArrayMerge;
  if (array) {
    return Array.isArray(target)
      ? arrayMerge(target, source, optionsArgument)
      : cloneIfNecessary(source, optionsArgument);
  } else {
    return mergeObject(target, source, optionsArgument);
  }
}
deepmerge.all = function deepmergeAll(array, optionsArgument) {
  if (!Array.isArray(array) || array.length < 2) {
    throw new Error(
      "first argument should be an array with at least two elements"
    );
  }
  // we are sure there are at least 2 values, so it is safe to have no initial value
  return array.reduce(function (prev, next) {
    return deepmerge(prev, next, optionsArgument);
  });
}; // https://blog.csdn.net/cuozhun3051/article/details/107060554
// DeepMerge for Objects {'a':{'x':1,'y':2}} + {'a':{'z':3},'b':4} => {'a':{'x':1,'y':2,'z':3},'b':4}

function fnc_sum(lst_one, lst_two) {
  let sum = 0;
  let len = lst_one.length;
  for (let i = 0; i < len; i++) {
    sum += lst_one[i] * lst_two[i];
  }
  return parseInt(sum);
} // 列表分项相乘求和[1,2,3]+[4,5,6] -> 1*4+2*5+3*6
function fnc_trn(lst_mpt) {
  let arr_tmp = lst_mpt;
  return arr_tmp[0].map(function (col, i) {
    return arr_tmp.map(function (row) {
      return row[i];
    });
  });
} // 列表转置[[1,2,3],[4,5,6]] -> [[1,4],[2,5],[3,6]]

export default {
  fnc_sum,
  fnc_trn,
  deepmerge, // 用于缩减echarts.option的深度合并
};
