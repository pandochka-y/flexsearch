(function(self){'use strict';
const DEBUG$$module$tmp$config = false;
const POLYFILL$$module$tmp$config = false;
const SUPPORT_WORKER$$module$tmp$config = true;
const SUPPORT_ENCODER$$module$tmp$config = true;
const SUPPORT_CACHE$$module$tmp$config = true;
const SUPPORT_ASYNC$$module$tmp$config = true;
const SUPPORT_STORE$$module$tmp$config = true;
const SUPPORT_TAGS$$module$tmp$config = true;
const SUPPORT_SUGGESTION$$module$tmp$config = true;
const SUPPORT_SERIALIZE$$module$tmp$config = true;
const SUPPORT_DOCUMENT$$module$tmp$config = true;
var module$tmp$config = {};
module$tmp$config.DEBUG = DEBUG$$module$tmp$config;
module$tmp$config.POLYFILL = POLYFILL$$module$tmp$config;
module$tmp$config.SUPPORT_ASYNC = SUPPORT_ASYNC$$module$tmp$config;
module$tmp$config.SUPPORT_CACHE = SUPPORT_CACHE$$module$tmp$config;
module$tmp$config.SUPPORT_DOCUMENT = SUPPORT_DOCUMENT$$module$tmp$config;
module$tmp$config.SUPPORT_ENCODER = SUPPORT_ENCODER$$module$tmp$config;
module$tmp$config.SUPPORT_SERIALIZE = SUPPORT_SERIALIZE$$module$tmp$config;
module$tmp$config.SUPPORT_STORE = SUPPORT_STORE$$module$tmp$config;
module$tmp$config.SUPPORT_SUGGESTION = SUPPORT_SUGGESTION$$module$tmp$config;
module$tmp$config.SUPPORT_TAGS = SUPPORT_TAGS$$module$tmp$config;
module$tmp$config.SUPPORT_WORKER = SUPPORT_WORKER$$module$tmp$config;
function IndexInterface$$module$tmp$type() {
  this.cache = null;
  this.matcher = null;
  this.stemmer = null;
  this.filter = null;
}
IndexInterface$$module$tmp$type.prototype.add;
IndexInterface$$module$tmp$type.prototype.append;
IndexInterface$$module$tmp$type.prototype.search;
IndexInterface$$module$tmp$type.prototype.update;
IndexInterface$$module$tmp$type.prototype.remove;
function DocumentInterface$$module$tmp$type() {
  this.field = null;
  this.index = null;
}
var module$tmp$type = {};
module$tmp$type.DocumentInterface = DocumentInterface$$module$tmp$type;
module$tmp$type.IndexInterface = IndexInterface$$module$tmp$type;
function parse_option$$module$tmp$common(value, default_value) {
  return typeof value !== "undefined" ? value : default_value;
}
function create_object_array$$module$tmp$common(count) {
  const array = new Array(count);
  for (let i = 0; i < count; i++) {
    array[i] = create_object$$module$tmp$common();
  }
  return array;
}
function create_arrays$$module$tmp$common(count) {
  const array = new Array(count);
  for (let i = 0; i < count; i++) {
    array[i] = [];
  }
  return array;
}
function get_keys$$module$tmp$common(obj) {
  return Object.keys(obj);
}
function create_object$$module$tmp$common() {
  return Object.create(null);
}
function concat$$module$tmp$common(arrays) {
  return [].concat.apply([], arrays);
}
function sort_by_length_down$$module$tmp$common(a, b) {
  return b.length - a.length;
}
function is_array$$module$tmp$common(val) {
  return val.constructor === Array;
}
function is_string$$module$tmp$common(val) {
  return typeof val === "string";
}
function is_object$$module$tmp$common(val) {
  return typeof val === "object";
}
function is_function$$module$tmp$common(val) {
  return typeof val === "function";
}
var module$tmp$common = {};
module$tmp$common.concat = concat$$module$tmp$common;
module$tmp$common.create_arrays = create_arrays$$module$tmp$common;
module$tmp$common.create_object = create_object$$module$tmp$common;
module$tmp$common.create_object_array = create_object_array$$module$tmp$common;
module$tmp$common.get_keys = get_keys$$module$tmp$common;
module$tmp$common.is_array = is_array$$module$tmp$common;
module$tmp$common.is_function = is_function$$module$tmp$common;
module$tmp$common.is_object = is_object$$module$tmp$common;
module$tmp$common.is_string = is_string$$module$tmp$common;
module$tmp$common.parse_option = parse_option$$module$tmp$common;
module$tmp$common.sort_by_length_down = sort_by_length_down$$module$tmp$common;
function pipeline$$module$tmp$lang(str, normalize, split, _collapse) {
  if (str) {
    if (normalize) {
      str = replace$$module$tmp$lang(str, normalize);
    }
    if (this.matcher) {
      str = replace$$module$tmp$lang(str, this.matcher);
    }
    if (this.stemmer && str.length > 1) {
      str = replace$$module$tmp$lang(str, this.stemmer);
    }
    if (_collapse && str.length > 1) {
      str = collapse$$module$tmp$lang(str);
    }
    if (split || split === "") {
      const words = str.split(split);
      return this.filter ? filter$$module$tmp$lang(words, this.filter) : words;
    }
  }
  return str;
}
const regex_whitespace$$module$tmp$lang = /[\p{Z}\p{S}\p{P}\p{C}]+/u;
const regex_normalize$$module$tmp$lang = /[\u0300-\u036f]/g;
function normalize$$module$tmp$lang(str) {
  if (str.normalize) {
    str = str.normalize("NFD").replace(regex_normalize$$module$tmp$lang, "");
  }
  return str;
}
function init_filter$$module$tmp$lang(words) {
  const filter = create_object$$module$tmp$common();
  for (let i = 0, length = words.length; i < length; i++) {
    filter[words[i]] = 1;
  }
  return filter;
}
function init_stemmer_or_matcher$$module$tmp$lang(obj, is_stemmer) {
  const keys = get_keys$$module$tmp$common(obj);
  const length = keys.length;
  const final = [];
  let removal = "", count = 0;
  for (let i = 0, key, tmp; i < length; i++) {
    key = keys[i];
    tmp = obj[key];
    if (tmp) {
      final[count++] = regex$$module$tmp$lang(is_stemmer ? "(?!\\b)" + key + "(\\b|_)" : key);
      final[count++] = tmp;
    } else {
      removal += (removal ? "|" : "") + key;
    }
  }
  if (removal) {
    final[count++] = regex$$module$tmp$lang(is_stemmer ? "(?!\\b)(" + removal + ")(\\b|_)" : "(" + removal + ")");
    final[count] = "";
  }
  return final;
}
function replace$$module$tmp$lang(str, regexp) {
  for (let i = 0, len = regexp.length; i < len; i += 2) {
    str = str.replace(regexp[i], regexp[i + 1]);
    if (!str) {
      break;
    }
  }
  return str;
}
function regex$$module$tmp$lang(str) {
  return new RegExp(str, "g");
}
function collapse$$module$tmp$lang(string) {
  let final = "", prev = "";
  for (let i = 0, len = string.length, char; i < len; i++) {
    if ((char = string[i]) !== prev) {
      final += prev = char;
    }
  }
  return final;
}
function filter$$module$tmp$lang(words, map) {
  const length = words.length;
  const filtered = [];
  for (let i = 0, count = 0; i < length; i++) {
    const word = words[i];
    if (word && !map[word]) {
      filtered[count++] = word;
    }
  }
  return filtered;
}
var module$tmp$lang = {};
module$tmp$lang.collapse = collapse$$module$tmp$lang;
module$tmp$lang.filter = filter$$module$tmp$lang;
module$tmp$lang.init_filter = init_filter$$module$tmp$lang;
module$tmp$lang.init_stemmer_or_matcher = init_stemmer_or_matcher$$module$tmp$lang;
module$tmp$lang.normalize = normalize$$module$tmp$lang;
module$tmp$lang.pipeline = pipeline$$module$tmp$lang;
module$tmp$lang.regex = regex$$module$tmp$lang;
module$tmp$lang.regex_whitespace = regex_whitespace$$module$tmp$lang;
module$tmp$lang.replace = replace$$module$tmp$lang;
const rtl$$module$tmp$lang$latin$default = false;
const tokenize$$module$tmp$lang$latin$default = "";
var $jscompDefaultExport$$module$tmp$lang$latin$default = {encode:encode$$module$tmp$lang$latin$default, rtl:rtl$$module$tmp$lang$latin$default, tokenize:tokenize$$module$tmp$lang$latin$default};
function encode$$module$tmp$lang$latin$default(str) {
  return pipeline$$module$tmp$lang.call(this, ("" + str).toLowerCase(), false, regex_whitespace$$module$tmp$lang, false);
}
var module$tmp$lang$latin$default = {};
module$tmp$lang$latin$default.default = $jscompDefaultExport$$module$tmp$lang$latin$default;
module$tmp$lang$latin$default.encode = encode$$module$tmp$lang$latin$default;
module$tmp$lang$latin$default.rtl = rtl$$module$tmp$lang$latin$default;
module$tmp$lang$latin$default.tokenize = tokenize$$module$tmp$lang$latin$default;
const global_lang$$module$tmp$global = {};
const global_charset$$module$tmp$global = {};
function registerCharset$$module$tmp$global(name, charset) {
  global_charset$$module$tmp$global[name] = charset;
}
function registerLanguage$$module$tmp$global(name, lang) {
  global_lang$$module$tmp$global[name] = lang;
}
var module$tmp$global = {};
module$tmp$global.global_charset = global_charset$$module$tmp$global;
module$tmp$global.global_lang = global_lang$$module$tmp$global;
module$tmp$global.registerCharset = registerCharset$$module$tmp$global;
module$tmp$global.registerLanguage = registerLanguage$$module$tmp$global;
var $jscompDefaultExport$$module$tmp$async = function(prototype) {
  register$$module$tmp$async(prototype, "add");
  register$$module$tmp$async(prototype, "append");
  register$$module$tmp$async(prototype, "search");
  register$$module$tmp$async(prototype, "update");
  register$$module$tmp$async(prototype, "remove");
};
function register$$module$tmp$async(prototype, key) {
  prototype[key + "Async"] = function() {
    const self = this;
    const args = arguments;
    const arg = args[args.length - 1];
    let callback;
    if (is_function$$module$tmp$common(arg)) {
      callback = arg;
      delete args[args.length - 1];
    }
    const promise = new Promise(function(resolve) {
      setTimeout(function() {
        self.async = true;
        const res = self[key].apply(self, args);
        self.async = false;
        resolve(res);
      });
    });
    if (callback) {
      promise.then(callback);
      return this;
    } else {
      return promise;
    }
  };
}
var module$tmp$async = {};
module$tmp$async.default = $jscompDefaultExport$$module$tmp$async;
function intersect$$module$tmp$intersect(arrays, limit, offset, suggest) {
  const length = arrays.length;
  let result = [];
  let check;
  let check_suggest;
  let size = 0;
  if (suggest) {
    suggest = [];
  }
  for (let x = length - 1; x >= 0; x--) {
    const word_arr = arrays[x];
    const word_arr_len = word_arr.length;
    const check_new = create_object$$module$tmp$common();
    let found = !check;
    for (let y = 0; y < word_arr_len; y++) {
      const arr = word_arr[y];
      const arr_len = arr.length;
      if (arr_len) {
        for (let z = 0, check_idx, id; z < arr_len; z++) {
          id = arr[z];
          if (check) {
            if (check[id]) {
              if (!x) {
                if (offset) {
                  offset--;
                } else {
                  result[size++] = id;
                  if (size === limit) {
                    return result;
                  }
                }
              }
              if (x || suggest) {
                check_new[id] = 1;
              }
              found = true;
            }
            if (suggest) {
              check_idx = (check_suggest[id] || 0) + 1;
              check_suggest[id] = check_idx;
              if (check_idx < length) {
                const tmp = suggest[check_idx - 2] || (suggest[check_idx - 2] = []);
                tmp[tmp.length] = id;
              }
            }
          } else {
            check_new[id] = 1;
          }
        }
      }
    }
    if (suggest) {
      check || (check_suggest = check_new);
    } else if (!found) {
      return [];
    }
    check = check_new;
  }
  if (suggest) {
    for (let x = suggest.length - 1, arr, len; x >= 0; x--) {
      arr = suggest[x];
      len = arr.length;
      for (let y = 0, id; y < len; y++) {
        id = arr[y];
        if (!check[id]) {
          if (offset) {
            offset--;
          } else {
            result[size++] = id;
            if (size === limit) {
              return result;
            }
          }
          check[id] = 1;
        }
      }
    }
  }
  return result;
}
function intersect_union$$module$tmp$intersect(mandatory, arrays) {
  const check = create_object$$module$tmp$common();
  const union = create_object$$module$tmp$common();
  const result = [];
  for (let x = 0; x < mandatory.length; x++) {
    check[mandatory[x]] = 1;
  }
  for (let x = 0, arr; x < arrays.length; x++) {
    arr = arrays[x];
    for (let y = 0, id; y < arr.length; y++) {
      id = arr[y];
      if (check[id]) {
        if (!union[id]) {
          union[id] = 1;
          result[result.length] = id;
        }
      }
    }
  }
  return result;
}
var module$tmp$intersect = {};
module$tmp$intersect.intersect = intersect$$module$tmp$intersect;
module$tmp$intersect.intersect_union = intersect_union$$module$tmp$intersect;
function CacheClass$$module$tmp$cache(limit) {
  this.limit = limit !== true && limit;
  this.cache = create_object$$module$tmp$common();
  this.queue = [];
}
var $jscompDefaultExport$$module$tmp$cache = CacheClass$$module$tmp$cache;
function searchCache$$module$tmp$cache(query, limit, options) {
  if (is_object$$module$tmp$common(query)) {
    query = query["query"];
  }
  let cache = this.cache.get(query);
  if (!cache) {
    cache = this.search(query, limit, options);
    this.cache.set(query, cache);
  }
  return cache;
}
CacheClass$$module$tmp$cache.prototype.set = function(key, value) {
  if (!this.cache[key]) {
    let length = this.queue.length;
    if (length === this.limit) {
      delete this.cache[this.queue[length - 1]];
    } else {
      length++;
    }
    for (let x = length - 1; x > 0; x--) {
      this.queue[x] = this.queue[x - 1];
    }
    this.queue[0] = key;
  }
  this.cache[key] = value;
};
CacheClass$$module$tmp$cache.prototype.get = function(key) {
  const cache = this.cache[key];
  if (this.limit && cache) {
    const pos = this.queue.indexOf(key);
    if (pos) {
      const tmp = this.queue[pos - 1];
      this.queue[pos - 1] = this.queue[pos];
      this.queue[pos] = tmp;
    }
  }
  return cache;
};
CacheClass$$module$tmp$cache.prototype.del = function(id) {
  for (let i = 0, item, key; i < this.queue.length; i++) {
    key = this.queue[i];
    item = this.cache[key];
    if (item.includes(id)) {
      this.queue.splice(i--, 1);
      delete this.cache[key];
    }
  }
};
var module$tmp$cache = {};
module$tmp$cache.default = $jscompDefaultExport$$module$tmp$cache;
module$tmp$cache.searchCache = searchCache$$module$tmp$cache;
const preset$$module$tmp$preset = {"memory":{charset:"latin:extra", resolution:3, minlength:4, fastupdate:false}, "performance":{resolution:3, minlength:3, optimize:false, context:{depth:2, resolution:1}}, "match":{charset:"latin:extra", tokenize:"reverse",}, "score":{charset:"latin:advanced", resolution:20, minlength:3, context:{depth:3, resolution:9,}}, "default":{},};
function apply_preset$$module$tmp$preset(options) {
  if (is_string$$module$tmp$common(options)) {
    if (DEBUG$$module$tmp$config && !preset$$module$tmp$preset[options]) {
      console.warn("Preset not found: " + options);
    }
    options = preset$$module$tmp$preset[options];
  } else {
    const preset = options["preset"];
    if (preset) {
      if (DEBUG$$module$tmp$config && !preset[preset]) {
        console.warn("Preset not found: " + preset);
      }
      options = Object.assign({}, preset[preset], options);
    }
  }
  return options;
}
var module$tmp$preset = {};
module$tmp$preset.default = apply_preset$$module$tmp$preset;
function async$$module$tmp$serialize(callback, self, field, key, index_doc, index, data) {
  setTimeout(function() {
    const res = callback(field ? field + "." + key : key, JSON.stringify(data));
    if (res && res["then"]) {
      res["then"](function() {
        self.export(callback, self, field, index_doc, index + 1);
      });
    } else {
      self.export(callback, self, field, index_doc, index + 1);
    }
  });
}
function exportIndex$$module$tmp$serialize(callback, self, field, index_doc, index) {
  let key, data;
  switch(index || (index = 0)) {
    case 0:
      key = "reg";
      if (this.fastupdate) {
        data = create_object$$module$tmp$common();
        for (let key in this.register) {
          data[key] = 1;
        }
      } else {
        data = this.register;
      }
      break;
    case 1:
      key = "cfg";
      data = {"doc":0, "opt":this.optimize ? 1 : 0};
      break;
    case 2:
      key = "map";
      data = this.map;
      break;
    case 3:
      key = "ctx";
      data = this.ctx;
      break;
    default:
      return;
  }
  async$$module$tmp$serialize(callback, self || this, field, key, index_doc, index, data);
  return true;
}
function importIndex$$module$tmp$serialize(key, data) {
  if (!data) {
    return;
  }
  if (is_string$$module$tmp$common(data)) {
    data = JSON.parse(data);
  }
  switch(key) {
    case "cfg":
      this.optimize = !!data["opt"];
      break;
    case "reg":
      this.fastupdate = false;
      this.register = data;
      break;
    case "map":
      this.map = data;
      break;
    case "ctx":
      this.ctx = data;
      break;
  }
}
function exportDocument$$module$tmp$serialize(callback, self, field, index_doc, index) {
  index || (index = 0);
  index_doc || (index_doc = 0);
  if (index_doc < this.field.length) {
    const field = this.field[index_doc];
    const idx = this.index[field];
    self = this;
    setTimeout(function() {
      if (!idx.export(callback, self, index ? field : "", index_doc, index++)) {
        index_doc++;
        index = 1;
        self.export(callback, self, field, index_doc, index);
      }
    });
  } else {
    let key, data;
    switch(index) {
      case 1:
        key = "tag";
        data = this.tagindex;
        break;
      case 2:
        key = "store";
        data = this.store;
        break;
      default:
        return;
    }
    async$$module$tmp$serialize(callback, this, field, key, index_doc, index, data);
  }
}
function importDocument$$module$tmp$serialize(key, data) {
  if (!data) {
    return;
  }
  if (is_string$$module$tmp$common(data)) {
    data = JSON.parse(data);
  }
  switch(key) {
    case "tag":
      this.tagindex = data;
      break;
    case "reg":
      this.fastupdate = false;
      this.register = data;
      for (let i = 0, index; i < this.field.length; i++) {
        index = this.index[this.field[i]];
        index.register = data;
        index.fastupdate = false;
      }
      break;
    case "store":
      this.store = data;
      break;
    default:
      key = key.split(".");
      const field = key[0];
      key = key[1];
      if (field && key) {
        this.index[field].import(key, data);
      }
  }
}
var module$tmp$serialize = {};
module$tmp$serialize.exportDocument = exportDocument$$module$tmp$serialize;
module$tmp$serialize.exportIndex = exportIndex$$module$tmp$serialize;
module$tmp$serialize.importDocument = importDocument$$module$tmp$serialize;
module$tmp$serialize.importIndex = importIndex$$module$tmp$serialize;
function Index$$module$tmp$index(options, _register) {
  if (!(this instanceof Index$$module$tmp$index)) {
    return new Index$$module$tmp$index(options);
  }
  let charset, lang, tmp;
  if (options) {
    if (SUPPORT_ENCODER$$module$tmp$config) {
      options = apply_preset$$module$tmp$preset(options);
    }
    charset = options["charset"];
    lang = options["lang"];
    if (is_string$$module$tmp$common(charset)) {
      if (charset.indexOf(":") === -1) {
        charset += ":default";
      }
      charset = global_charset$$module$tmp$global[charset];
    }
    if (is_string$$module$tmp$common(lang)) {
      lang = global_lang$$module$tmp$global[lang];
    }
  } else {
    options = {};
  }
  let resolution, optimize, context = options["context"] || {};
  this.encode = options["encode"] || charset && charset.encode || encode$$module$tmp$lang$latin$default;
  this.register = _register || create_object$$module$tmp$common();
  this.resolution = resolution = options["resolution"] || 9;
  this.tokenize = tmp = charset && charset.tokenize || options["tokenize"] || "strict";
  this.depth = tmp === "strict" && context["depth"];
  this.bidirectional = parse_option$$module$tmp$common(context["bidirectional"], true);
  this.optimize = optimize = parse_option$$module$tmp$common(options["optimize"], true);
  this.fastupdate = parse_option$$module$tmp$common(options["fastupdate"], true);
  this.minlength = options["minlength"] || 1;
  this.boost = options["boost"];
  this.map = optimize ? create_object_array$$module$tmp$common(resolution) : create_object$$module$tmp$common();
  this.resolution_ctx = resolution = context["resolution"] || 1;
  this.ctx = optimize ? create_object_array$$module$tmp$common(resolution) : create_object$$module$tmp$common();
  this.rtl = charset && charset.rtl || options["rtl"];
  this.matcher = (tmp = options["matcher"] || lang && lang.matcher) && init_stemmer_or_matcher$$module$tmp$lang(tmp, false);
  this.stemmer = (tmp = options["stemmer"] || lang && lang.stemmer) && init_stemmer_or_matcher$$module$tmp$lang(tmp, true);
  this.filter = (tmp = options["filter"] || lang && lang.filter) && init_filter$$module$tmp$lang(tmp);
  if (SUPPORT_CACHE$$module$tmp$config) {
    this.cache = (tmp = options["cache"]) && new $jscompDefaultExport$$module$tmp$cache(tmp);
  }
}
var $jscompDefaultExport$$module$tmp$index = Index$$module$tmp$index;
Index$$module$tmp$index.prototype.append = function(id, content) {
  return this.add(id, content, true);
};
Index$$module$tmp$index.prototype.add = function(id, content, _append, _skip_update) {
  if (content && (id || id === 0)) {
    if (!_skip_update && !_append && this.register[id]) {
      return this.update(id, content);
    }
    content = this.encode("" + content);
    const length = content.length;
    if (length) {
      const dupes_ctx = create_object$$module$tmp$common();
      const dupes = create_object$$module$tmp$common();
      const depth = this.depth;
      const resolution = this.resolution;
      for (let i = 0; i < length; i++) {
        let term = content[this.rtl ? length - 1 - i : i];
        let term_length = term.length;
        if (term && term_length >= this.minlength && (depth || !dupes[term])) {
          let score = get_score$$module$tmp$index(resolution, length, i);
          let token = "";
          switch(this.tokenize) {
            case "full":
              if (term_length > 2) {
                for (let x = 0; x < term_length; x++) {
                  for (let y = term_length; y > x; y--) {
                    if (y - x >= this.minlength) {
                      const partial_score = get_score$$module$tmp$index(resolution, length, i, term_length, x);
                      token = term.substring(x, y);
                      this.push_index(dupes, token, partial_score, id, _append);
                    }
                  }
                }
                break;
              }
            case "reverse":
              if (term_length > 1) {
                for (let x = term_length - 1; x > 0; x--) {
                  token = term[x] + token;
                  if (token.length >= this.minlength) {
                    const partial_score = get_score$$module$tmp$index(resolution, length, i, term_length, x);
                    this.push_index(dupes, token, partial_score, id, _append);
                  }
                }
                token = "";
              }
            case "forward":
              if (term_length > 1) {
                for (let x = 0; x < term_length; x++) {
                  token += term[x];
                  if (token.length >= this.minlength) {
                    this.push_index(dupes, token, score, id, _append);
                  }
                }
                break;
              }
            default:
              if (this.boost) {
                score = Math.min(score / this.boost(content, term, i) | 0, resolution - 1);
              }
              this.push_index(dupes, term, score, id, _append);
              if (depth) {
                if (length > 1 && i < length - 1) {
                  const dupes_inner = create_object$$module$tmp$common();
                  const resolution = this.resolution_ctx;
                  const keyword = term;
                  const size = Math.min(depth + 1, length - i);
                  dupes_inner[keyword] = 1;
                  for (let x = 1; x < size; x++) {
                    term = content[this.rtl ? length - 1 - i - x : i + x];
                    if (term && term.length >= this.minlength && !dupes_inner[term]) {
                      dupes_inner[term] = 1;
                      const context_score = get_score$$module$tmp$index(resolution + (length / 2 > resolution ? 0 : 1), length, i, size - 1, x - 1);
                      const swap = this.bidirectional && term > keyword;
                      this.push_index(dupes_ctx, swap ? keyword : term, context_score, id, _append, swap ? term : keyword);
                    }
                  }
                }
              }
          }
        }
      }
      this.fastupdate || (this.register[id] = 1);
    }
  }
  return this;
};
function get_score$$module$tmp$index(resolution, length, i, term_length, x) {
  return i && resolution > 1 ? length + (term_length || 0) <= resolution ? i + (x || 0) : (resolution - 1) / (length + (term_length || 0)) * (i + (x || 0)) + 1 | 0 : 0;
}
Index$$module$tmp$index.prototype.push_index = function(dupes, value, score, id, append, keyword) {
  let arr = keyword ? this.ctx : this.map;
  if (!dupes[value] || keyword && !dupes[value][keyword]) {
    if (this.optimize) {
      arr = arr[score];
    }
    if (keyword) {
      dupes = dupes[value] || (dupes[value] = create_object$$module$tmp$common());
      dupes[keyword] = 1;
      arr = arr[keyword] || (arr[keyword] = create_object$$module$tmp$common());
    } else {
      dupes[value] = 1;
    }
    arr = arr[value] || (arr[value] = []);
    if (!this.optimize) {
      arr = arr[score] || (arr[score] = []);
    }
    if (!append || !arr.includes(id)) {
      arr[arr.length] = id;
      if (this.fastupdate) {
        const tmp = this.register[id] || (this.register[id] = []);
        tmp[tmp.length] = arr;
      }
    }
  }
};
Index$$module$tmp$index.prototype.search = function(query, limit, options) {
  if (!options) {
    if (!limit && is_object$$module$tmp$common(query)) {
      options = query;
      query = options["query"];
    } else if (is_object$$module$tmp$common(limit)) {
      options = limit;
    }
  }
  let result = [];
  let length;
  let context, suggest, offset = 0;
  if (options) {
    query = options["query"] || query;
    limit = options["limit"];
    offset = options["offset"] || 0;
    context = options["context"];
    suggest = SUPPORT_SUGGESTION$$module$tmp$config && options["suggest"];
  }
  if (query) {
    query = this.encode("" + query);
    length = query.length;
    if (length > 1) {
      const dupes = create_object$$module$tmp$common();
      const query_new = [];
      for (let i = 0, count = 0, term; i < length; i++) {
        term = query[i];
        if (term && term.length >= this.minlength && !dupes[term]) {
          if (!this.optimize && !suggest && !this.map[term]) {
            return result;
          } else {
            query_new[count++] = term;
            dupes[term] = 1;
          }
        }
      }
      query = query_new;
      length = query.length;
    }
  }
  if (!length) {
    return result;
  }
  limit || (limit = 100);
  let depth = this.depth && length > 1 && context !== false;
  let index = 0, keyword;
  if (depth) {
    keyword = query[0];
    index = 1;
  } else {
    if (length > 1) {
      query.sort(sort_by_length_down$$module$tmp$common);
    }
  }
  for (let arr, term; index < length; index++) {
    term = query[index];
    if (depth) {
      arr = this.add_result(result, suggest, limit, offset, length === 2, term, keyword);
      if (!suggest || arr !== false || !result.length) {
        keyword = term;
      }
    } else {
      arr = this.add_result(result, suggest, limit, offset, length === 1, term);
    }
    if (arr) {
      return arr;
    }
    if (suggest && index === length - 1) {
      let length = result.length;
      if (!length) {
        if (depth) {
          depth = 0;
          index = -1;
          continue;
        }
        return result;
      } else if (length === 1) {
        return single_result$$module$tmp$index(result[0], limit, offset);
      }
    }
  }
  return intersect$$module$tmp$intersect(result, limit, offset, suggest);
};
Index$$module$tmp$index.prototype.add_result = function(result, suggest, limit, offset, single_term, term, keyword) {
  let word_arr = [];
  let arr = keyword ? this.ctx : this.map;
  if (!this.optimize) {
    arr = get_array$$module$tmp$index(arr, term, keyword, this.bidirectional);
  }
  if (arr) {
    let count = 0;
    const arr_len = Math.min(arr.length, keyword ? this.resolution_ctx : this.resolution);
    for (let x = 0, size = 0, tmp, len; x < arr_len; x++) {
      tmp = arr[x];
      if (tmp) {
        if (this.optimize) {
          tmp = get_array$$module$tmp$index(tmp, term, keyword, this.bidirectional);
        }
        if (offset) {
          if (tmp && single_term) {
            len = tmp.length;
            if (len <= offset) {
              offset -= len;
              tmp = null;
            } else {
              tmp = tmp.slice(offset);
              offset = 0;
            }
          }
        }
        if (tmp) {
          word_arr[count++] = tmp;
          if (single_term) {
            size += tmp.length;
            if (size >= limit) {
              break;
            }
          }
        }
      }
    }
    if (count) {
      if (single_term) {
        return single_result$$module$tmp$index(word_arr, limit, 0);
      }
      result[result.length] = word_arr;
      return;
    }
  }
  return !suggest && word_arr;
};
function single_result$$module$tmp$index(result, limit, offset) {
  if (result.length === 1) {
    result = result[0];
  } else {
    result = concat$$module$tmp$common(result);
  }
  return offset || result.length > limit ? result.slice(offset, offset + limit) : result;
}
function get_array$$module$tmp$index(arr, term, keyword, bidirectional) {
  if (keyword) {
    const swap = bidirectional && term > keyword;
    arr = arr[swap ? term : keyword];
    arr = arr && arr[swap ? keyword : term];
  } else {
    arr = arr[term];
  }
  return arr;
}
Index$$module$tmp$index.prototype.contain = function(id) {
  return !!this.register[id];
};
Index$$module$tmp$index.prototype.update = function(id, content) {
  return this.remove(id).add(id, content);
};
Index$$module$tmp$index.prototype.remove = function(id, _skip_deletion) {
  const refs = this.register[id];
  if (refs) {
    if (this.fastupdate) {
      for (let i = 0, tmp; i < refs.length; i++) {
        tmp = refs[i];
        tmp.splice(tmp.indexOf(id), 1);
      }
    } else {
      remove_index$$module$tmp$index(this.map, id, this.resolution, this.optimize);
      if (this.depth) {
        remove_index$$module$tmp$index(this.ctx, id, this.resolution_ctx, this.optimize);
      }
    }
    _skip_deletion || delete this.register[id];
    if (SUPPORT_CACHE$$module$tmp$config && this.cache) {
      this.cache.del(id);
    }
  }
  return this;
};
function remove_index$$module$tmp$index(map, id, res, optimize, resolution) {
  let count = 0;
  if (is_array$$module$tmp$common(map)) {
    if (!resolution) {
      resolution = Math.min(map.length, res);
      for (let x = 0, arr; x < resolution; x++) {
        arr = map[x];
        if (arr) {
          count = remove_index$$module$tmp$index(arr, id, res, optimize, resolution);
          if (!optimize && !count) {
            delete map[x];
          }
        }
      }
    } else {
      const pos = map.indexOf(id);
      if (pos !== -1) {
        if (map.length > 1) {
          map.splice(pos, 1);
          count++;
        }
      } else {
        count++;
      }
    }
  } else {
    for (let key in map) {
      count = remove_index$$module$tmp$index(map[key], id, res, optimize, resolution);
      if (!count) {
        delete map[key];
      }
    }
  }
  return count;
}
if (SUPPORT_CACHE$$module$tmp$config) {
  Index$$module$tmp$index.prototype.searchCache = searchCache$$module$tmp$cache;
}
if (SUPPORT_SERIALIZE$$module$tmp$config) {
  Index$$module$tmp$index.prototype.export = exportIndex$$module$tmp$serialize;
  Index$$module$tmp$index.prototype.import = importIndex$$module$tmp$serialize;
}
if (SUPPORT_ASYNC$$module$tmp$config) {
  $jscompDefaultExport$$module$tmp$async(Index$$module$tmp$index.prototype);
}
var module$tmp$index = {};
module$tmp$index.default = $jscompDefaultExport$$module$tmp$index;
var $jscompDefaultExport$$module$tmp$worker$handler = function(data) {
  data = data["data"];
  const index = self["_index"];
  const args = data["args"];
  const task = data["task"];
  switch(task) {
    case "init":
      const options = data["options"] || {};
      const factory = data["factory"];
      const encode = options["encode"];
      options["cache"] = false;
      if (encode && encode.indexOf("function") === 0) {
        options["encode"] = Function("return " + encode)();
      }
      if (factory) {
        Function("return " + factory)()(self);
        self["_index"] = new self["FlexSearch"]["Index"](options);
        delete self["FlexSearch"];
      } else {
        self["_index"] = new $jscompDefaultExport$$module$tmp$index(options);
      }
      break;
    default:
      const id = data["id"];
      const message = index[task].apply(index, args);
      postMessage(task === "search" ? {"id":id, "msg":message} : {"id":id});
  }
};
var module$tmp$worker$handler = {};
module$tmp$worker$handler.default = $jscompDefaultExport$$module$tmp$worker$handler;
let pid$$module$tmp$worker$index = 0;
function WorkerIndex$$module$tmp$worker$index(options) {
  if (!(this instanceof WorkerIndex$$module$tmp$worker$index)) {
    return new WorkerIndex$$module$tmp$worker$index(options);
  }
  let opt;
  if (options) {
    if (is_function$$module$tmp$common(opt = options["encode"])) {
      options["encode"] = opt.toString();
    }
  } else {
    options = {};
  }
  let factory = (self || window)["_factory"];
  if (factory) {
    factory = factory.toString();
  }
  const is_node_js = typeof window === "undefined" && self["exports"];
  const _self = this;
  this.worker = create$$module$tmp$worker$index(factory, is_node_js, options["worker"]);
  this.resolver = create_object$$module$tmp$common();
  if (!this.worker) {
    return;
  }
  if (is_node_js) {
    this.worker["on"]("message", function(msg) {
      _self.resolver[msg["id"]](msg["msg"]);
      delete _self.resolver[msg["id"]];
    });
  } else {
    this.worker.onmessage = function(msg) {
      msg = msg["data"];
      _self.resolver[msg["id"]](msg["msg"]);
      delete _self.resolver[msg["id"]];
    };
  }
  this.worker.postMessage({"task":"init", "factory":factory, "options":options});
}
var $jscompDefaultExport$$module$tmp$worker$index = WorkerIndex$$module$tmp$worker$index;
register$$module$tmp$worker$index("add");
register$$module$tmp$worker$index("append");
register$$module$tmp$worker$index("search");
register$$module$tmp$worker$index("update");
register$$module$tmp$worker$index("remove");
function register$$module$tmp$worker$index(key) {
  WorkerIndex$$module$tmp$worker$index.prototype[key] = WorkerIndex$$module$tmp$worker$index.prototype[key + "Async"] = function() {
    const self = this;
    const args = [].slice.call(arguments);
    const arg = args[args.length - 1];
    let callback;
    if (is_function$$module$tmp$common(arg)) {
      callback = arg;
      args.splice(args.length - 1, 1);
    }
    const promise = new Promise(function(resolve) {
      setTimeout(function() {
        self.resolver[++pid$$module$tmp$worker$index] = resolve;
        self.worker.postMessage({"task":key, "id":pid$$module$tmp$worker$index, "args":args});
      });
    });
    if (callback) {
      promise.then(callback);
      return this;
    } else {
      return promise;
    }
  };
}
function create$$module$tmp$worker$index(factory, is_node_js, worker_path) {
  let worker;
  try {
    worker = is_node_js ? eval('new (require("worker_threads")["Worker"])("../dist/node/node.js")') : factory ? new Worker(URL.createObjectURL(new Blob(["onmessage=" + $jscompDefaultExport$$module$tmp$worker$handler.toString()], {"type":"text/javascript"}))) : new Worker(is_string$$module$tmp$common(worker_path) ? worker_path : "worker/worker.js", {type:"module"});
  } catch (e) {
  }
  return worker;
}
var module$tmp$worker$index = {};
module$tmp$worker$index.default = $jscompDefaultExport$$module$tmp$worker$index;
function Document$$module$tmp$document(options) {
  if (!(this instanceof Document$$module$tmp$document)) {
    return new Document$$module$tmp$document(options);
  }
  const document = options["document"] || options["doc"] || options;
  let opt;
  this.tree = [];
  this.field = [];
  this.marker = [];
  this.register = create_object$$module$tmp$common();
  this.key = (opt = document["key"] || document["id"]) && parse_tree$$module$tmp$document(opt, this.marker) || "id";
  this.fastupdate = parse_option$$module$tmp$common(options["fastupdate"], true);
  if (SUPPORT_STORE$$module$tmp$config) {
    this.storetree = (opt = document["store"]) && opt !== true && [];
    this.store = opt && create_object$$module$tmp$common();
  }
  if (SUPPORT_TAGS$$module$tmp$config) {
    this.tag = (opt = document["tag"]) && parse_tree$$module$tmp$document(opt, this.marker);
    this.tagindex = opt && create_object$$module$tmp$common();
  }
  if (SUPPORT_CACHE$$module$tmp$config) {
    this.cache = (opt = options["cache"]) && new $jscompDefaultExport$$module$tmp$cache(opt);
    options["cache"] = false;
  }
  if (SUPPORT_WORKER$$module$tmp$config) {
    this.worker = options["worker"];
  }
  if (SUPPORT_ASYNC$$module$tmp$config) {
    this.async = false;
  }
  this.index = parse_descriptor$$module$tmp$document.call(this, options, document);
}
var $jscompDefaultExport$$module$tmp$document = Document$$module$tmp$document;
function parse_descriptor$$module$tmp$document(options, document) {
  const index = create_object$$module$tmp$common();
  let field = document["index"] || document["field"] || document;
  if (is_string$$module$tmp$common(field)) {
    field = [field];
  }
  for (let i = 0, key, opt; i < field.length; i++) {
    key = field[i];
    if (!is_string$$module$tmp$common(key)) {
      opt = key;
      key = key["field"];
    }
    opt = is_object$$module$tmp$common(opt) ? Object.assign({}, options, opt) : options;
    if (SUPPORT_WORKER$$module$tmp$config && this.worker) {
      index[key] = new $jscompDefaultExport$$module$tmp$worker$index(opt);
      if (!index[key].worker) {
        this.worker = false;
      }
    }
    if (!this.worker) {
      index[key] = new $jscompDefaultExport$$module$tmp$index(opt, this.register);
    }
    this.tree[i] = parse_tree$$module$tmp$document(key, this.marker);
    this.field[i] = key;
  }
  if (SUPPORT_STORE$$module$tmp$config && this.storetree) {
    let store = document["store"];
    if (is_string$$module$tmp$common(store)) {
      store = [store];
    }
    for (let i = 0; i < store.length; i++) {
      this.storetree[i] = parse_tree$$module$tmp$document(store[i], this.marker);
    }
  }
  return index;
}
function parse_tree$$module$tmp$document(key, marker) {
  const tree = key.split(":");
  let count = 0;
  for (let i = 0; i < tree.length; i++) {
    key = tree[i];
    if (key.indexOf("[]") >= 0) {
      key = key.substring(0, key.length - 2);
      if (key) {
        marker[count] = true;
      }
    }
    if (key) {
      tree[count++] = key;
    }
  }
  if (count < tree.length) {
    tree.length = count;
  }
  return count > 1 ? tree : tree[0];
}
function parse_simple$$module$tmp$document(obj, tree) {
  if (is_string$$module$tmp$common(tree)) {
    obj = obj[tree];
  } else {
    for (let i = 0; obj && i < tree.length; i++) {
      obj = obj[tree[i]];
    }
  }
  return obj;
}
function store_value$$module$tmp$document(obj, store, tree, pos, key) {
  obj = obj[key];
  if (pos === tree.length - 1) {
    store[key] = obj;
  } else if (obj) {
    if (is_array$$module$tmp$common(obj)) {
      store = store[key] = new Array(obj.length);
      for (let i = 0; i < obj.length; i++) {
        store_value$$module$tmp$document(obj, store, tree, pos, i);
      }
    } else {
      store = store[key] || (store[key] = create_object$$module$tmp$common());
      key = tree[++pos];
      store_value$$module$tmp$document(obj, store, tree, pos, key);
    }
  }
}
function add_index$$module$tmp$document(obj, tree, marker, pos, index, id, key, _append) {
  obj = obj[key];
  if (obj) {
    if (pos === tree.length - 1) {
      if (is_array$$module$tmp$common(obj)) {
        if (marker[pos]) {
          for (let i = 0; i < obj.length; i++) {
            index.add(id, obj[i], true, true);
          }
          return;
        }
        obj = obj.join(" ");
      }
      index.add(id, obj, _append, true);
    } else {
      if (is_array$$module$tmp$common(obj)) {
        for (let i = 0; i < obj.length; i++) {
          add_index$$module$tmp$document(obj, tree, marker, pos, index, id, i, _append);
        }
      } else {
        key = tree[++pos];
        add_index$$module$tmp$document(obj, tree, marker, pos, index, id, key, _append);
      }
    }
  }
}
Document$$module$tmp$document.prototype.add = function(id, content, _append) {
  if (is_object$$module$tmp$common(id)) {
    content = id;
    id = parse_simple$$module$tmp$document(content, this.key);
  }
  if (content && (id || id === 0)) {
    if (!_append && this.register[id]) {
      return this.update(id, content);
    }
    for (let i = 0, tree, field; i < this.field.length; i++) {
      field = this.field[i];
      tree = this.tree[i];
      if (is_string$$module$tmp$common(tree)) {
        tree = [tree];
      }
      add_index$$module$tmp$document(content, tree, this.marker, 0, this.index[field], id, tree[0], _append);
    }
    if (SUPPORT_TAGS$$module$tmp$config && this.tag) {
      let tag = parse_simple$$module$tmp$document(content, this.tag);
      let dupes = create_object$$module$tmp$common();
      if (is_string$$module$tmp$common(tag)) {
        tag = [tag];
      }
      for (let i = 0, key, arr; i < tag.length; i++) {
        key = tag[i];
        if (!dupes[key]) {
          dupes[key] = 1;
          arr = this.tagindex[key] || (this.tagindex[key] = []);
          if (!_append || !arr.includes(id)) {
            arr[arr.length] = id;
            if (this.fastupdate) {
              const tmp = this.register[id] || (this.register[id] = []);
              tmp[tmp.length] = arr;
            }
          }
        }
      }
    }
    if (SUPPORT_STORE$$module$tmp$config && this.store && (!_append || !this.store[id])) {
      let store;
      if (this.storetree) {
        store = create_object$$module$tmp$common();
        for (let i = 0, tree; i < this.storetree.length; i++) {
          tree = this.storetree[i];
          if (is_string$$module$tmp$common(tree)) {
            store[tree] = content[tree];
          } else {
            store_value$$module$tmp$document(content, store, tree, 0, tree[0]);
          }
        }
      }
      this.store[id] = store || content;
    }
  }
  return this;
};
Document$$module$tmp$document.prototype.append = function(id, content) {
  return this.add(id, content, true);
};
Document$$module$tmp$document.prototype.update = function(id, content) {
  return this.remove(id).add(id, content);
};
Document$$module$tmp$document.prototype.remove = function(id) {
  if (is_object$$module$tmp$common(id)) {
    id = parse_simple$$module$tmp$document(id, this.key);
  }
  if (this.register[id]) {
    for (let i = 0; i < this.field.length; i++) {
      this.index[this.field[i]].remove(id, !this.worker);
      if (this.fastupdate) {
        break;
      }
    }
    if (SUPPORT_TAGS$$module$tmp$config && this.tag) {
      if (!this.fastupdate) {
        for (let key in this.tagindex) {
          const tag = this.tagindex[key];
          const pos = tag.indexOf(id);
          if (pos !== -1) {
            if (tag.length > 1) {
              tag.splice(pos, 1);
            } else {
              delete this.tagindex[key];
            }
          }
        }
      }
    }
    if (SUPPORT_STORE$$module$tmp$config && this.store) {
      delete this.store[id];
    }
    delete this.register[id];
  }
  return this;
};
Document$$module$tmp$document.prototype.search = function(query, limit, options, _resolve) {
  if (!options) {
    if (!limit && is_object$$module$tmp$common(query)) {
      options = query;
      query = "";
    } else if (is_object$$module$tmp$common(limit)) {
      options = limit;
      limit = 0;
    }
  }
  let result = [], result_field = [];
  let pluck, enrich;
  let field, tag, bool, offset, count = 0;
  if (options) {
    if (is_array$$module$tmp$common(options)) {
      field = options;
      options = null;
    } else {
      query = options["query"] || query;
      pluck = options["pluck"];
      field = pluck || options["index"] || options["field"];
      tag = SUPPORT_TAGS$$module$tmp$config && options["tag"];
      enrich = SUPPORT_STORE$$module$tmp$config && this.store && options["enrich"];
      bool = options["bool"] === "and";
      limit = options["limit"] || limit || 100;
      offset = options["offset"] || 0;
      if (tag) {
        if (is_string$$module$tmp$common(tag)) {
          tag = [tag];
        }
        if (!query) {
          for (let i = 0, res; i < tag.length; i++) {
            res = get_tag$$module$tmp$document.call(this, tag[i], limit, offset, enrich);
            if (res) {
              result[result.length] = res;
              count++;
            }
          }
          return count ? result : [];
        }
      }
      if (is_string$$module$tmp$common(field)) {
        field = [field];
      }
    }
  }
  field || (field = this.field);
  bool = bool && (field.length > 1 || tag && tag.length > 1);
  const promises = !_resolve && (this.worker || this.async) && [];
  for (let i = 0, res, key, len; i < field.length; i++) {
    let field_options;
    key = field[i];
    if (!is_string$$module$tmp$common(key)) {
      field_options = key;
      key = field_options["field"];
      query = field_options["query"] || query;
      limit = field_options["limit"] || limit;
    }
    if (promises) {
      promises[i] = this.index[key].searchAsync(query, limit, field_options || options);
      continue;
    } else if (_resolve) {
      res = _resolve[i];
    } else {
      res = this.index[key].search(query, limit, field_options || options);
    }
    len = res && res.length;
    if (tag && len) {
      const arr = [];
      let count = 0;
      if (bool) {
        arr[0] = [res];
      }
      for (let y = 0, key, res; y < tag.length; y++) {
        key = tag[y];
        res = this.tagindex[key];
        len = res && res.length;
        if (len) {
          count++;
          arr[arr.length] = bool ? [res] : res;
        }
      }
      if (count) {
        if (bool) {
          res = intersect$$module$tmp$intersect(arr, limit || 100, offset || 0);
        } else {
          res = intersect_union$$module$tmp$intersect(res, arr);
        }
        len = res.length;
      }
    }
    if (len) {
      result_field[count] = key;
      result[count++] = res;
    } else if (bool) {
      return [];
    }
  }
  if (promises) {
    const self = this;
    return new Promise(function(resolve) {
      Promise.all(promises).then(function(result) {
        resolve(self.search(query, limit, options, result));
      });
    });
  }
  if (!count) {
    return [];
  }
  if (pluck && (!enrich || !this.store)) {
    return result[0];
  }
  for (let i = 0, res; i < result_field.length; i++) {
    res = result[i];
    if (res.length) {
      if (enrich) {
        res = apply_enrich$$module$tmp$document.call(this, res);
      }
    }
    if (pluck) {
      return res;
    }
    result[i] = {"field":result_field[i], "result":res};
  }
  return result;
};
function get_tag$$module$tmp$document(key, limit, offset, enrich) {
  let res = this.tagindex[key];
  let len = res && res.length - offset;
  if (len && len > 0) {
    if (len > limit || offset) {
      res = res.slice(offset, offset + limit);
    }
    if (enrich) {
      res = apply_enrich$$module$tmp$document.call(this, res);
    }
    return {"tag":key, "result":res};
  }
}
function apply_enrich$$module$tmp$document(res) {
  const arr = new Array(res.length);
  for (let x = 0, id; x < res.length; x++) {
    id = res[x];
    arr[x] = {"id":id, "doc":this.store[id]};
  }
  return arr;
}
Document$$module$tmp$document.prototype.contain = function(id) {
  return !!this.register[id];
};
if (SUPPORT_STORE$$module$tmp$config) {
  Document$$module$tmp$document.prototype.get = function(id) {
    return this.store[id];
  };
  Document$$module$tmp$document.prototype.set = function(id, data) {
    this.store[id] = data;
    return this;
  };
}
if (SUPPORT_CACHE$$module$tmp$config) {
  Document$$module$tmp$document.prototype.searchCache = searchCache$$module$tmp$cache;
}
if (SUPPORT_SERIALIZE$$module$tmp$config) {
  Document$$module$tmp$document.prototype.export = exportDocument$$module$tmp$serialize;
  Document$$module$tmp$document.prototype.import = importDocument$$module$tmp$serialize;
}
if (SUPPORT_ASYNC$$module$tmp$config) {
  $jscompDefaultExport$$module$tmp$async(Document$$module$tmp$document.prototype);
}
var module$tmp$document = {};
module$tmp$document.default = $jscompDefaultExport$$module$tmp$document;
const rtl$$module$tmp$lang$latin$simple = false;
const tokenize$$module$tmp$lang$latin$simple = "";
var $jscompDefaultExport$$module$tmp$lang$latin$simple = {encode:encode$$module$tmp$lang$latin$simple, rtl:rtl$$module$tmp$lang$latin$simple, tokenize:tokenize$$module$tmp$lang$latin$simple};
const regex_a$$module$tmp$lang$latin$simple = regex$$module$tmp$lang("[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]"), regex_e$$module$tmp$lang$latin$simple = regex$$module$tmp$lang("[\u00e8\u00e9\u00ea\u00eb]"), regex_i$$module$tmp$lang$latin$simple = regex$$module$tmp$lang("[\u00ec\u00ed\u00ee\u00ef]"), regex_o$$module$tmp$lang$latin$simple = regex$$module$tmp$lang("[\u00f2\u00f3\u00f4\u00f5\u00f6\u0151]"), regex_u$$module$tmp$lang$latin$simple = regex$$module$tmp$lang("[\u00f9\u00fa\u00fb\u00fc\u0171]"), 
regex_y$$module$tmp$lang$latin$simple = regex$$module$tmp$lang("[\u00fd\u0177\u00ff]"), regex_n$$module$tmp$lang$latin$simple = regex$$module$tmp$lang("\u00f1"), regex_c$$module$tmp$lang$latin$simple = regex$$module$tmp$lang("[\u00e7c]"), regex_s$$module$tmp$lang$latin$simple = regex$$module$tmp$lang("\u00df"), regex_and$$module$tmp$lang$latin$simple = regex$$module$tmp$lang(" & ");
const pairs$$module$tmp$lang$latin$simple = [regex_a$$module$tmp$lang$latin$simple, "a", regex_e$$module$tmp$lang$latin$simple, "e", regex_i$$module$tmp$lang$latin$simple, "i", regex_o$$module$tmp$lang$latin$simple, "o", regex_u$$module$tmp$lang$latin$simple, "u", regex_y$$module$tmp$lang$latin$simple, "y", regex_n$$module$tmp$lang$latin$simple, "n", regex_c$$module$tmp$lang$latin$simple, "k", regex_s$$module$tmp$lang$latin$simple, "s", regex_and$$module$tmp$lang$latin$simple, " and "];
function encode$$module$tmp$lang$latin$simple(str) {
  str = "" + str;
  return pipeline$$module$tmp$lang.call(this, normalize$$module$tmp$lang(str).toLowerCase(), !str.normalize && pairs$$module$tmp$lang$latin$simple, regex_whitespace$$module$tmp$lang, false);
}
var module$tmp$lang$latin$simple = {};
module$tmp$lang$latin$simple.default = $jscompDefaultExport$$module$tmp$lang$latin$simple;
module$tmp$lang$latin$simple.encode = encode$$module$tmp$lang$latin$simple;
module$tmp$lang$latin$simple.rtl = rtl$$module$tmp$lang$latin$simple;
module$tmp$lang$latin$simple.tokenize = tokenize$$module$tmp$lang$latin$simple;
const rtl$$module$tmp$lang$latin$balance = false;
const tokenize$$module$tmp$lang$latin$balance = "strict";
var $jscompDefaultExport$$module$tmp$lang$latin$balance = {encode:encode$$module$tmp$lang$latin$balance, rtl:rtl$$module$tmp$lang$latin$balance, tokenize:tokenize$$module$tmp$lang$latin$balance};
const regex_strip$$module$tmp$lang$latin$balance = /[^a-z0-9]+/;
const soundex$$module$tmp$lang$latin$balance = {"b":"p", "v":"f", "w":"f", "z":"s", "x":"s", "\u00df":"s", "d":"t", "n":"m", "c":"k", "g":"k", "j":"k", "q":"k", "i":"e", "y":"e", "u":"o"};
function encode$$module$tmp$lang$latin$balance(str) {
  str = encode$$module$tmp$lang$latin$simple.call(this, str).join(" ");
  const result = [];
  if (str) {
    const words = str.split(regex_strip$$module$tmp$lang$latin$balance);
    const length = words.length;
    for (let x = 0, tmp, count = 0; x < length; x++) {
      if ((str = words[x]) && (!this.filter || !this.filter[str])) {
        tmp = str[0];
        let code = soundex$$module$tmp$lang$latin$balance[tmp] || tmp;
        let previous = code;
        for (let i = 1; i < str.length; i++) {
          tmp = str[i];
          const current = soundex$$module$tmp$lang$latin$balance[tmp] || tmp;
          if (current && current !== previous) {
            code += current;
            previous = current;
          }
        }
        result[count++] = code;
      }
    }
  }
  return result;
}
var module$tmp$lang$latin$balance = {};
module$tmp$lang$latin$balance.default = $jscompDefaultExport$$module$tmp$lang$latin$balance;
module$tmp$lang$latin$balance.encode = encode$$module$tmp$lang$latin$balance;
module$tmp$lang$latin$balance.rtl = rtl$$module$tmp$lang$latin$balance;
module$tmp$lang$latin$balance.tokenize = tokenize$$module$tmp$lang$latin$balance;
const rtl$$module$tmp$lang$latin$advanced = false;
const tokenize$$module$tmp$lang$latin$advanced = "";
var $jscompDefaultExport$$module$tmp$lang$latin$advanced = {encode:encode$$module$tmp$lang$latin$advanced, rtl:rtl$$module$tmp$lang$latin$advanced, tokenize:tokenize$$module$tmp$lang$latin$advanced};
const regex_ae$$module$tmp$lang$latin$advanced = regex$$module$tmp$lang("ae"), regex_oe$$module$tmp$lang$latin$advanced = regex$$module$tmp$lang("oe"), regex_sh$$module$tmp$lang$latin$advanced = regex$$module$tmp$lang("sh"), regex_th$$module$tmp$lang$latin$advanced = regex$$module$tmp$lang("th"), regex_ph$$module$tmp$lang$latin$advanced = regex$$module$tmp$lang("ph"), regex_pf$$module$tmp$lang$latin$advanced = regex$$module$tmp$lang("pf");
const pairs$$module$tmp$lang$latin$advanced = [regex_ae$$module$tmp$lang$latin$advanced, "a", regex_oe$$module$tmp$lang$latin$advanced, "o", regex_sh$$module$tmp$lang$latin$advanced, "s", regex_th$$module$tmp$lang$latin$advanced, "t", regex_ph$$module$tmp$lang$latin$advanced, "f", regex_pf$$module$tmp$lang$latin$advanced, "f", regex$$module$tmp$lang("(?![aeo])h(?![aeo])"), "", regex$$module$tmp$lang("(?!^[aeo])h(?!^[aeo])"), ""];
function encode$$module$tmp$lang$latin$advanced(str, _skip_postprocessing) {
  if (str) {
    str = encode$$module$tmp$lang$latin$balance.call(this, str).join(" ");
    if (str.length > 2) {
      str = replace$$module$tmp$lang(str, pairs$$module$tmp$lang$latin$advanced);
    }
    if (!_skip_postprocessing) {
      if (str.length > 1) {
        str = collapse$$module$tmp$lang(str);
      }
      if (str) {
        str = str.split(" ");
      }
    }
  }
  return str || [];
}
var module$tmp$lang$latin$advanced = {};
module$tmp$lang$latin$advanced.default = $jscompDefaultExport$$module$tmp$lang$latin$advanced;
module$tmp$lang$latin$advanced.encode = encode$$module$tmp$lang$latin$advanced;
module$tmp$lang$latin$advanced.rtl = rtl$$module$tmp$lang$latin$advanced;
module$tmp$lang$latin$advanced.tokenize = tokenize$$module$tmp$lang$latin$advanced;
const rtl$$module$tmp$lang$latin$extra = false;
const tokenize$$module$tmp$lang$latin$extra = "";
var $jscompDefaultExport$$module$tmp$lang$latin$extra = {encode:encode$$module$tmp$lang$latin$extra, rtl:rtl$$module$tmp$lang$latin$extra, tokenize:tokenize$$module$tmp$lang$latin$extra};
const prefix$$module$tmp$lang$latin$extra = "(?!\\b)";
const regex_vowel$$module$tmp$lang$latin$extra = regex$$module$tmp$lang(prefix$$module$tmp$lang$latin$extra + "[aeo]");
const pairs$$module$tmp$lang$latin$extra = [regex_vowel$$module$tmp$lang$latin$extra, ""];
function encode$$module$tmp$lang$latin$extra(str) {
  if (str) {
    str = encode$$module$tmp$lang$latin$advanced.call(this, str, true);
    if (str.length > 1) {
      str = str.replace(regex_vowel$$module$tmp$lang$latin$extra, "");
    }
    if (str.length > 1) {
      str = collapse$$module$tmp$lang(str);
    }
    if (str) {
      str = str.split(" ");
    }
  }
  return str || [];
}
var module$tmp$lang$latin$extra = {};
module$tmp$lang$latin$extra.default = $jscompDefaultExport$$module$tmp$lang$latin$extra;
module$tmp$lang$latin$extra.encode = encode$$module$tmp$lang$latin$extra;
module$tmp$lang$latin$extra.rtl = rtl$$module$tmp$lang$latin$extra;
module$tmp$lang$latin$extra.tokenize = tokenize$$module$tmp$lang$latin$extra;
$jscompDefaultExport$$module$tmp$document.prototype.add;
$jscompDefaultExport$$module$tmp$document.prototype.append;
$jscompDefaultExport$$module$tmp$document.prototype.search;
$jscompDefaultExport$$module$tmp$document.prototype.update;
$jscompDefaultExport$$module$tmp$document.prototype.remove;
$jscompDefaultExport$$module$tmp$document.prototype.contain;
$jscompDefaultExport$$module$tmp$document.prototype.get;
$jscompDefaultExport$$module$tmp$document.prototype.set;
$jscompDefaultExport$$module$tmp$index.prototype.add;
$jscompDefaultExport$$module$tmp$index.prototype.append;
$jscompDefaultExport$$module$tmp$index.prototype.search;
$jscompDefaultExport$$module$tmp$index.prototype.update;
$jscompDefaultExport$$module$tmp$index.prototype.remove;
$jscompDefaultExport$$module$tmp$index.prototype.contain;
if (SUPPORT_CACHE$$module$tmp$config) {
  $jscompDefaultExport$$module$tmp$index.prototype.searchCache;
  $jscompDefaultExport$$module$tmp$document.prototype.searchCache;
}
if (SUPPORT_ASYNC$$module$tmp$config) {
  $jscompDefaultExport$$module$tmp$document.prototype.addAsync;
  $jscompDefaultExport$$module$tmp$document.prototype.appendAsync;
  $jscompDefaultExport$$module$tmp$document.prototype.searchAsync;
  $jscompDefaultExport$$module$tmp$document.prototype.updateAsync;
  $jscompDefaultExport$$module$tmp$document.prototype.removeAsync;
  $jscompDefaultExport$$module$tmp$index.prototype.addAsync;
  $jscompDefaultExport$$module$tmp$index.prototype.appendAsync;
  $jscompDefaultExport$$module$tmp$index.prototype.searchAsync;
  $jscompDefaultExport$$module$tmp$index.prototype.updateAsync;
  $jscompDefaultExport$$module$tmp$index.prototype.removeAsync;
}
if (SUPPORT_SERIALIZE$$module$tmp$config) {
  $jscompDefaultExport$$module$tmp$index.prototype.export;
  $jscompDefaultExport$$module$tmp$index.prototype.import;
  $jscompDefaultExport$$module$tmp$document.prototype.export;
  $jscompDefaultExport$$module$tmp$document.prototype.import;
}
if (SUPPORT_ENCODER$$module$tmp$config) {
  registerCharset$$module$tmp$global("latin:default", $jscompDefaultExport$$module$tmp$lang$latin$default);
  registerCharset$$module$tmp$global("latin:simple", $jscompDefaultExport$$module$tmp$lang$latin$simple);
  registerCharset$$module$tmp$global("latin:balance", $jscompDefaultExport$$module$tmp$lang$latin$balance);
  registerCharset$$module$tmp$global("latin:advanced", $jscompDefaultExport$$module$tmp$lang$latin$advanced);
  registerCharset$$module$tmp$global("latin:extra", $jscompDefaultExport$$module$tmp$lang$latin$extra);
}
const root$$module$tmp$webpack = self;
let tmp$$module$tmp$webpack;
const FlexSearch$$module$tmp$webpack = {"Index":$jscompDefaultExport$$module$tmp$index, "Document":SUPPORT_DOCUMENT$$module$tmp$config ? $jscompDefaultExport$$module$tmp$document : null, "Worker":SUPPORT_WORKER$$module$tmp$config ? $jscompDefaultExport$$module$tmp$worker$index : null, "registerCharset":registerCharset$$module$tmp$global, "registerLanguage":registerLanguage$$module$tmp$global};
if ((tmp$$module$tmp$webpack = root$$module$tmp$webpack["define"]) && tmp$$module$tmp$webpack["amd"]) {
  tmp$$module$tmp$webpack([], function() {
    return FlexSearch$$module$tmp$webpack;
  });
} else if (root$$module$tmp$webpack["exports"]) {
  root$$module$tmp$webpack["exports"] = FlexSearch$$module$tmp$webpack;
} else {
  root$$module$tmp$webpack["FlexSearch"] = FlexSearch$$module$tmp$webpack;
}
var module$tmp$webpack = {};
}(this));
