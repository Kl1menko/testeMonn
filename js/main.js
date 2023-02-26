/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/sliders */ "./src/js/modules/sliders.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/menu */ "./src/js/modules/menu.js");
/* harmony import */ var _modules_animated__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/animated */ "./src/js/modules/animated.js");
/* harmony import */ var _modules_menu_change__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/menu-change */ "./src/js/modules/menu-change.js");
/* harmony import */ var _modules_about_hover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/about-hover */ "./src/js/modules/about-hover.js");
/* harmony import */ var _modules_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/select */ "./src/js/modules/select.js");
/* harmony import */ var _modules_renderProduct__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/renderProduct */ "./src/js/modules/renderProduct.js");
/* harmony import */ var _modules_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/input */ "./src/js/modules/input.js");
/* harmony import */ var _modules_open_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/open-form */ "./src/js/modules/open-form.js");
/* harmony import */ var _modules_menu_scroll__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/menu-scroll */ "./src/js/modules/menu-scroll.js");
/* harmony import */ var _modules_validation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/validation */ "./src/js/modules/validation.js");
/* harmony import */ var _modules_thank_you_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/thank-you.js */ "./src/js/modules/thank-you.js");












window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  Object(_modules_menu__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (window.innerWidth || document.documentElement.clientWidth) > 850 ? Object(_modules_animated__WEBPACK_IMPORTED_MODULE_2__["default"])() : null;
  Object(_modules_menu_change__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (window.innerWidth || document.documentElement.clientWidth) > 1024 ? Object(_modules_about_hover__WEBPACK_IMPORTED_MODULE_4__["default"])() : null;
  Object(_modules_select__WEBPACK_IMPORTED_MODULE_5__["default"])();
  Object(_modules_renderProduct__WEBPACK_IMPORTED_MODULE_6__["default"])();
  Object(_modules_sliders__WEBPACK_IMPORTED_MODULE_0__["mainPageSlider"])();
  Object(_modules_input__WEBPACK_IMPORTED_MODULE_7__["default"])();
  Object(_modules_open_form__WEBPACK_IMPORTED_MODULE_8__["default"])();
  Object(_modules_validation__WEBPACK_IMPORTED_MODULE_10__["default"])();
  Object(_modules_thank_you_js__WEBPACK_IMPORTED_MODULE_11__["default"])();
  Object(_modules_menu_scroll__WEBPACK_IMPORTED_MODULE_9__["default"])();
});

/***/ }),

/***/ "./src/js/modules/about-add-cart.js":
/*!******************************************!*\
  !*** ./src/js/modules/about-add-cart.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var cartAddAbout = function cartAddAbout(buttonAdd, sizeBox, closeButton) {
  var buttonAdded = document.querySelectorAll(buttonAdd),
      basketAppend = document.querySelector('.payment__simplebar .simplebar-content'),
      basketBox = document.querySelectorAll('[data-basket-desk]'),
      basketBoxMobile = document.querySelectorAll('[data-bask-mob]'),
      image = document.querySelectorAll('.product__main-gallery .swiper-slide')[0],
      imageMobile = document.querySelectorAll('.about-product__swiper-image img')[0],
      payment = document.querySelector('.payment'),
      about = document.querySelector('.about-product');
  var basketPrice = document.querySelector('.final-price');

  var priceWithoutSpacer = function priceWithoutSpacer(string) {
    return string.replace(/\s/g, '');
  };

  var normalPrice = function normalPrice(string) {
    return String(string).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  };

  var Allprice = parseInt(priceWithoutSpacer(basketPrice.textContent));

  var plusFullPrice = function plusFullPrice(currentPrice) {
    Allprice = parseInt(priceWithoutSpacer(basketPrice.textContent));
    return Allprice += currentPrice;
  };

  var minusFullPrice = function minusFullPrice(currentPrice) {
    Allprice = parseInt(priceWithoutSpacer(basketPrice.textContent));
    return Allprice -= currentPrice;
  };

  var printFullPrice = function printFullPrice() {
    basketPrice.textContent = "".concat(normalPrice(Allprice));
  };

  var printQuantity = function printQuantity() {
    var length = basketAppend.children.length;

    if ((window.innerWidth || document.documentElement.clientWidth) > 850) {
      basketBox.forEach(function (cartBox) {
        length > 0 ? cartBox.classList.add('basket_active') : cartBox.classList.remove('basket_active');
        cartBox.querySelector('[data-number-length]').textContent = length;
      });
    }

    basketBoxMobile.forEach(function (basketMobile) {
      basketMobile.querySelector('.header__basket-number').textContent = length;
    });
    basketPrice.parentNode.previousElementSibling.querySelector('.many-product').textContent = "".concat(basketAppend.children.length > 1 && basketAppend.children.length <= 4 ? basketAppend.children.length + " товара" : basketAppend.children.length > 4 ? basketAppend.children.length + " товаров" : basketAppend.children.length + " товар");
  };

  var generateCartProduct = function generateCartProduct(id, image, nameProduct, color, price, size) {
    return "\n    <div data-id=\"".concat(id, "\" class=\"payment__product\">\n      <div class=\"payment__images\">\n        <img src=\"").concat(image, "\" alt=\"").concat(nameProduct, "\" />\n      </div>\n      <div class=\"payment__product-info\">\n        <div class=\"payment__product-head\">\n          <p class=\"payment__product-name\">").concat(nameProduct, "</p>\n          <p class=\"payment__product-size\">\u0420\u0430\u0437\u043C\u0435\u0440: ").concat(size, "</p>\n          <p class=\"payment__product-color\">\u0426\u0432\u0435\u0442: ").concat(color, "</p>\n          <p class=\"payment__product-color payment__product-price\">\u0426\u0435\u043D\u0430: ").concat(normalPrice(price), " \u0433\u0440\u043D.</p>\n        </div>\n        <a href=\"#\" class=\"payment__product-delete button-link button-black title-mini\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</a>\n      </div>\n    </div>\n    ");
  };

  buttonAdded.forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      var self = e.currentTarget;
      var parent = self.closest('.about-product__info');
      var id = parent.dataset.id;
      var img = image.getAttribute('data-src');
      var imgMobile = image.getAttribute('data-src');
      var title = parent.querySelector('.product__title').textContent;
      var priceNumber = parseInt(priceWithoutSpacer(parent.querySelector('.product__price .price').textContent));
      var size = '',
          color = '';
      var selectSize = document.querySelector(sizeBox),
          closeBtn = document.querySelectorAll(closeButton);
      selectSize.parentNode.classList.add('about-product__size-active');
      about.classList.add('about-product__select-size');
      selectSize.childNodes.forEach(function (item) {
        item.addEventListener('click', function () {
          size = item.textContent;
          selectSize.parentNode.classList.remove('about-product__size-active');
          selectSize.parentNode.nextElementSibling.classList.add('about-product__size-active');
        });
      });
      selectSize.parentNode.nextElementSibling.querySelector('[data-mobile-color]').childNodes.forEach(function (item) {
        item.addEventListener('click', function () {
          color = item.textContent;
          selectSize.parentNode.nextElementSibling.classList.remove('about-product__size-active');
          about.classList.remove('about-product__select-size');
          plusFullPrice(priceNumber);
          basketAppend.insertAdjacentHTML('afterbegin', generateCartProduct(id, imgMobile, title, color, priceNumber, size));
          printFullPrice();
          basketPrice = document.querySelector('.final-price');
          printQuantity();
          updateState();
          payment.classList.add('payment_active');
          history.pushState("", document.title, window.location.pathname);
          about.classList.toggle('_activePopUp');
        });
      });
      closeBtn.forEach(function (btn) {
        return [btn.addEventListener('click', function () {
          btn.parentNode.classList.remove('about-product__size-active');
          about.classList.remove('about-product__select-size');
        })];
      });
    });
  });

  var initialState = function initialState() {
    if (localStorage.getItem('cart') !== null) {
      basketAppend.innerHTML = localStorage.getItem('cart');
      printQuantity();
    }
  };

  var updateState = function updateState() {
    var html = basketAppend.innerHTML;
    html = html.trim();

    if (html.length) {
      localStorage.setItem('cart', html);
    } else {
      localStorage.removeItem('cart');
    }
  };

  var countSum = function countSum() {
    document.querySelectorAll('.box-basket__product').forEach(function (item) {
      Allprice += parseInt(priceWithoutSpacer(item.querySelector('.cart-product__price').textContent));
    });
  };
};

/* harmony default export */ __webpack_exports__["default"] = (cartAddAbout);

/***/ }),

/***/ "./src/js/modules/about-hover.js":
/*!***************************************!*\
  !*** ./src/js/modules/about-hover.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var aboutHover = function aboutHover() {
  var columsHover = document.querySelectorAll('.about__column'),
      backgroundAll = document.querySelectorAll('.background'),
      backgroundSend = document.querySelector('.background-send'),
      backgroundVozvrat = document.querySelector('.background-vozvrat'),
      backgroundBuy = document.querySelector('.background-buy'),
      backgroundDefault = document.querySelector('.background-default'),
      about = document.querySelector('.about-column');

  var deleteClass = function deleteClass() {
    backgroundAll.forEach(function (item) {
      item.classList.remove('background_active');
    });
  };

  columsHover.forEach(function (column) {
    column.addEventListener('mouseover', function (e) {
      var target = e.target;
      columsHover.forEach(function (item) {
        return item.classList.remove('about__column_active');
      });
      column.classList.add('about__column_active');

      if (target.classList.contains('send')) {
        deleteClass();
        backgroundSend.classList.add('background_active');
      } else if (target.classList.contains('vozvrat')) {
        deleteClass();
        backgroundVozvrat.classList.add('background_active');
      } else if (target.classList.contains('buy')) {
        deleteClass();
        backgroundBuy.classList.add('background_active');
      } else if (target.classList.contains('about-column')) {
        deleteClass();
        backgroundDefault.classList.add('background_active');
      }
    });
    about.addEventListener('mouseover', function () {
      columsHover.forEach(function (item) {
        return item.classList.remove('about__column_active');
      });
      columsHover.forEach(function (item) {
        item.classList.add('about__column_out');
      });
      backgroundDefault.classList.add('background_active');
      column.classList.remove('about__column_active');
      column.classList.remove('about__column_out');
      column.classList.add('about__column_active-about');
    });
    about.addEventListener('mouseout', function () {
      deleteClass();
      backgroundSend.classList.add('background_active');
      columsHover.forEach(function (item) {
        return item.classList.remove('about__column_active');
      });
      columsHover.forEach(function (item) {
        return item.classList.remove('about__column_out');
      });
      column.classList.remove('about__column_active-about');
      columsHover[0].classList.add('about__column_active');
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (aboutHover);

/***/ }),

/***/ "./src/js/modules/animated.js":
/*!************************************!*\
  !*** ./src/js/modules/animated.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var animation = function animation() {
  var brandHoverChange = document.querySelectorAll('.top-brand__brand');
  brandHoverChange.forEach(function (brand) {
    brand.addEventListener('mouseover', function () {
      brandHoverChange.forEach(function (item) {
        return item.style.transform = 'scale(0.95)';
      });
      brand.style.transform = 'scale(1)';
    });
    brand.addEventListener('mouseout', function () {
      brandHoverChange.forEach(function (item) {
        return item.style.transform = 'scale(1)';
      });
      brand.style.transform = 'scale(1)';
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (animation);

/***/ }),

/***/ "./src/js/modules/cart.js":
/*!********************************!*\
  !*** ./src/js/modules/cart.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var cart = function cart(response) {
  var cartButtonAdd = document.querySelectorAll('[data-add]'),
      basketAppend = document.querySelector('.payment__simplebar .simplebar-content'),
      basketButton = document.querySelectorAll('[data-basket-desk]'),
      basketButtonMobile = document.querySelectorAll('[data-bask-mob]'),
      basketWindow = document.querySelector('.payment');
  var basketPrice = document.querySelector('.final-price');

  var priceWithoutSpacer = function priceWithoutSpacer(string) {
    return string.replace(/\s/g, '');
  };

  var normalPrice = function normalPrice(string) {
    return String(string).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  };

  var Allprice = parseInt(priceWithoutSpacer(basketPrice.textContent));

  var plusFullPrice = function plusFullPrice(currentPrice) {
    Allprice = parseInt(priceWithoutSpacer(basketPrice.textContent));
    return Allprice += currentPrice;
  };

  var minusFullPrice = function minusFullPrice(currentPrice) {
    Allprice = parseInt(priceWithoutSpacer(basketPrice.textContent));
    return Allprice -= currentPrice;
  };

  var printFullPrice = function printFullPrice() {
    basketPrice.textContent = "".concat(normalPrice(Allprice));
  };

  var printQuantity = function printQuantity() {
    var length = basketAppend.children.length;

    if ((window.innerWidth || document.documentElement.clientWidth) > 850) {
      basketButton.forEach(function (cartBox) {
        length > 0 ? cartBox.classList.add('basket_active') : cartBox.classList.remove('basket_active');
        cartBox.querySelector('[data-number-length]').textContent = length;
      });
    }

    basketButtonMobile.forEach(function (basketMobile) {
      basketMobile.querySelector('.header__basket-number').textContent = length;
    });
    basketPrice.parentNode.previousElementSibling.querySelector('.many-product').textContent = "".concat(basketAppend.children.length > 1 && basketAppend.children.length <= 4 ? basketAppend.children.length + " товара" : basketAppend.children.length > 4 ? basketAppend.children.length + " товаров" : basketAppend.children.length + " товар");

    if (length == 0) {
      basketWindow.classList.remove('payment_active');
      document.body.style.overflow = 'auto';
    }
  };

  response.forEach(function (productElem) {
    var sizeAndColorHandle = function sizeAndColorHandle(containerColor, arrColor, containerSize, arrSize) {
      var containerColorChange = document.querySelector(containerColor),
          containerSizeChange = document.querySelector(containerSize);
      var sizeCurrent = '',
          colorCurrent = '';
      containerColorChange.textContent = '';
      containerSizeChange.textContent = '';

      var arrayEvent = function arrayEvent(array, containerRender, classAdd) {
        array.forEach(function (item) {
          var list = document.createElement('p');
          list.classList.add(classAdd);
          list.setAttribute('value', item);
          list.textContent = item;
          containerRender.appendChild(list);
        });
      };

      arrayEvent(arrColor, containerColorChange, 'select-color__footer-option');
      arrayEvent(arrSize, containerSizeChange, 'select-size__footer-option');
      containerColorChange.parentNode.classList.add('select-footer_active');
      document.body.classList.add('select-size');
      containerColorChange.childNodes.forEach(function (childColor) {
        childColor.addEventListener('click', function () {
          colorCurrent = childColor.textContent;
          containerColorChange.parentNode.classList.remove('select-footer_active');
          containerSizeChange.parentNode.classList.add('select-footer_active');
        });
      });
      containerSizeChange.childNodes.forEach(function (childSize) {
        childSize.addEventListener('click', function () {
          sizeCurrent = childSize.textContent;
          containerSizeChange.parentNode.classList.remove('select-footer_active');
          document.body.classList.remove('select-size');
          var elementCart = document.createElement('div');
          elementCart.classList.add('payment__product');
          elementCart.setAttribute('data-id', productElem.id);
          elementCart.innerHTML = "\n          <div class=\"payment__images\">\n            <img src=\"".concat(productElem.images[0].img1, "\" alt=\"").concat(productElem.name, "\" />\n          </div>\n          <div class=\"payment__product-info\">\n            <div class=\"payment__product-head\">\n              <p class=\"payment__product-name\">").concat(productElem.name, "</p>\n              <p class=\"payment__product-size\">\u0420\u0430\u0437\u043C\u0435\u0440: ").concat(sizeCurrent, "</p>\n              <p class=\"payment__product-color\">\u0426\u0432\u0435\u0442: ").concat(colorCurrent, "</p>\n              <p class=\"payment__product-color payment__product-price\">\u0426\u0435\u043D\u0430: ").concat(productElem.price, " \u0433\u0440\u043D.</p>\n            </div>\n            <a href=\"#\" class=\"payment__product-delete button-link button-black title-mini\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</a>\n          </div>");
          basketAppend.prepend(elementCart);
          printQuantity();
          basketPrice = document.querySelector('.final-price');
          var priceNumber = parseInt(priceWithoutSpacer(productElem.price));
          plusFullPrice(priceNumber);
          printFullPrice();
          updateState();
          basketWindow.classList.add('payment_active');
          document.body.style.overflow = 'hidden';
        });
      });
    };

    var createProductElem = function createProductElem(id) {
      if (id == productElem.id) {
        var idProduct = productElem.id;
        var arrSize = productElem.allSize.split(',');
        var arrColor = productElem.color.split(',');

        var _basketPrice = document.querySelector('.final-price');

        sizeAndColorHandle('.select__container', arrColor, '.select__container-size', arrSize);
      }
    };

    cartButtonAdd.forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        var target = e.target;

        if (target.closest('.button-buy') || target.closest('.top-brand__brand-button')) {
          createProductElem(item.getAttribute('data-id'));
        }
      });
    });
  });

  var initialState = function initialState() {
    if (localStorage.getItem('cart') !== null) {
      basketAppend.innerHTML = localStorage.getItem('cart');
      printQuantity();
      countSum();
      printFullPrice();
    }
  };

  var updateState = function updateState() {
    var html = basketAppend.innerHTML;
    html = html.trim();

    if (html.length) {
      localStorage.setItem('cart', html);
    } else {
      localStorage.removeItem('cart');
    }
  };

  var countSum = function countSum() {
    document.querySelectorAll('.payment__product').forEach(function (item) {
      Allprice += parseInt(priceWithoutSpacer(item.querySelector('.payment__product-price').textContent.replace(/\D/g, '')));
    });
  };

  initialState();

  var deleteProducts = function deleteProducts(poductParent) {
    var currentPrice = parseInt(priceWithoutSpacer(poductParent.querySelector('.payment__product-price').textContent.replace(/\D/g, '')));
    basketPrice = document.querySelector('.final-price');
    minusFullPrice(currentPrice);
    printFullPrice();
    poductParent.remove();
    printQuantity();
    updateState();
  };

  basketAppend.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.closest('.payment__product .payment__product-delete')) {
      deleteProducts(e.target.closest('.payment__product'));
    }
  });
  var closeBtn = document.querySelectorAll('.select-size__footer-close');
  closeBtn.forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.body.classList.remove('select-size');
      btn.parentNode.classList.remove('select-footer_active');
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (cart);

/***/ }),

/***/ "./src/js/modules/create-about.js":
/*!****************************************!*\
  !*** ./src/js/modules/create-about.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select */ "./src/js/modules/select.js");
/* harmony import */ var _about_add_cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./about-add-cart */ "./src/js/modules/about-add-cart.js");
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timer */ "./src/js/modules/timer.js");




var createAbout = function createAbout(response, idProduct) {
  var addedLocation = function addedLocation(id) {
    window.location.hash = "!/product/id=".concat(id);
  };

  response.forEach(function (item) {
    if (item.id == idProduct) {
      var colorArr = item.color.split(','),
          sizeArr = item.allSize.split(',');
      addedLocation(idProduct);

      var priceWithoutSpacer = function priceWithoutSpacer(string) {
        return string.replace(/\s/g, '');
      };

      var normalPrice = function normalPrice(string) {
        return String(string).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      };

      var procentSale = normalPrice(parseInt((parseInt(priceWithoutSpacer(item.sale)) - parseInt(priceWithoutSpacer(item.price))) / parseInt(priceWithoutSpacer(item.sale)) * 100));
      var aboutProduct = document.querySelector('.product');
      aboutProduct.setAttribute('data-id-product', item.id);

      var renderTimer = function renderTimer() {
        if (item.timer) {
          return "<div class=\"timer\">\n          <p class=\"timer__title\">\u0421\u043A\u0438\u0434\u043A\u0430 \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C\u0441\u044F \u0447\u0435\u0440\u0435\u0437...</p>\n          <div class=\"timer__timer\">\n            <div class=\"timer-block\">\n              <span id=\"days\">12</span>\n              <span class=\"timer__text\">\u0414\u043D\u0438</span>\n            </div>\n            <div class=\"timer-block\">\n              <span id=\"house\">12</span>\n              <span class=\"timer__text\">\u0427\u0430\u0441\u044B</span>\n            </div>\n            <div class=\"timer-block\">\n              <span id=\"minutes\">12</span>\n              <span class=\"timer__text\">\u041C\u0438\u043D\u0443\u0442\u044B</span>\n            </div>\n            <div class=\"timer-block\">\n              <span id=\"seconds\">59</span>\n              <span class=\"timer__text\">\u0421\u0435\u043A\u0443\u043D\u0434\u044B</span>\n            </div>\n          </div>\n      </div>";
        } else {
          return '';
        }
      };

      aboutProduct.innerHTML = "\n      <div class=\"product__header\">\n        <div class=\"product__header-back about-product__back\">\n          <span class=\"material-icons\">keyboard_backspace</span>\n          <span class=\"txt\">\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433</span>\n        </div>\n        <div class=\"product__header-logo\">\n          <img src=\"assets/img/product-header-logo.svg\" alt=\"logotype\" />\n        </div>\n        <div class=\"product__header-social\">\n          <a href=\"#\">instagram</a>\n          <a target=\"_blank\" href=\"https://www.facebook.com/Aesthetic-shop-322831972493687\">\n            <span class=\"material-icons\">\n              facebook\n            </span>\n          <span class=\"link\">facebook</span>\n          </a>\n        </div>\n      </div>\n      <div class=\"product__container\">\n        <div class=\"product__main-gallery\">\n          ".concat(item.timer ? "<div class=\"sale-procent\">-".concat(procentSale, "%</div>") : '', "\n          <div class=\"swiper-container gallery-topTwo\">\n            <div class=\"swiper-wrapper swiper-wrapper-images-mobile\">\n            </div>\n            <div class=\"swiper-button-next swiper-button-white\"></div>\n            <div class=\"swiper-button-prev swiper-button-white\"></div>\n          </div>\n        </div>\n        <div data-id=\"").concat(item.id, "\" class=\"product__info about-product__info\">\n        <p class=\"product__title\">").concat(item.name, "</p>\n        <div class=\"product__info-mark\">\n          <span class=\"xit\">\u0425\u0438\u0442 \u043F\u0440\u043E\u0434\u0430\u0436</span>\n          ").concat(item.timer ? '<span class="sal">Акция</span>' : '', "\n        </div>\n        ").concat(renderTimer(), "\n        <div class=\"product__info-info\">\n          <p class=\"txt-product nal\">\u0415\u0441\u0442\u044C \u0432 \u043D\u0430\u043B\u0438\u0447\u0438\u0438</p>\n          <p class=\"txt-product\"><span>\u0410\u0440\u0442\u0438\u043A\u0443\u043B</span> 100012</p>\n        </div>\n        <div class=\"product__info-info\">\n          <p class=\"txt-product\"><span>\u0422\u043A\u0430\u043D\u044C:</span> ").concat(item.cloth, "</p>\n          <p class=\"txt-product\"><span>\u0426\u0432\u0435\u0442\u0430:</span> ").concat(item.color, "</p>\n          <p class=\"txt-product\"><span>\u0420\u0430\u0437\u043C\u0435\u0440\u044B:</span> ").concat(item.allSize, "</p>\n        </div>\n          <p class=\"txt-product product__description\">").concat(item.description ? "".concat(item.description) : '', "</p>\n          <div class=\"product__price\">\n            <p class=\"price\">").concat(item.price, " \u0433\u0440\u043D.</p>\n            ").concat(item.timer ? "<p class=\"product__price-sale\">".concat(item.sale, " \u0433\u0440\u043D.</p>") : '', "\n          </div>\n          <a data-about-add data-about-add-mobile href=\"#\" class=\"button button-buy before-btn btn-buy\">\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C</a>\n          <p class=\"txt-product product__description\">\n            \u041C\u044B \u0442\u0449\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u043A\u0430\u0436\u0434\u0443\u044E \u043C\u043E\u0434\u0435\u043B\u044C \u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u043A\u0430\u0436\u0434\u044B\u0439 \u0442\u043E\u0432\u0430\u0440, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u043C\u044B \u0437\u0430\u0432\u043E\u0437\u0438\u043C \u043D\u0430 \u0441\u043A\u043B\u0430\u0434 \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u0438 \u043E\u043D\u0438 \u0431\u044B\u0441\u0442\u0440\u043E \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u044E\u0442\u0441\u044F.\n            \u041D\u0430\u0436\u0438\u043C\u0430\u0439 \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0438 \u0443\u0437\u043D\u0430\u0432\u0430\u0439 \u043F\u0440\u0438\u044F\u0442\u043D\u044B\u0435 \u0434\u0435\u0442\u0430\u043B\u0438 \u043D\u0430\u0448\u0438\u0445 \u0430\u043A\u0446\u0438\u0439!\n          </p>\n      </div>\n      </div>\n      <div class=\"product__row\">\n        <div class=\"product__delivery-container\">\n          <div class=\"product__delivery\">\n            <p class=\"product__delivery-title\">\n              <span class=\"material-icons\">\n                local_shipping\n              </span>\n              \u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430\n            </p>\n            <p class=\"product__delivery__txt\">\n              \u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u044C\u0441\u044F <span>\u041D\u043E\u0432\u043E\u0439 \u043F\u043E\u0447\u0442\u043E\u0439</span>. \u0421\u0440\u043E\u043A \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 1-3 \u0434\u043D\u044F \u0441 \u043C\u043E\u043C\u0435\u043D\u0442\u0430 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430.\n            </p>\n          </div>\n          <div class=\"product__delivery\">\n            <p class=\"product__delivery-title\">\n              <span class=\"material-icons\">\n                credit_score\n              </span>\n              \u041E\u043F\u043B\u0430\u0442\u0430\n            </p>\n            <p class=\"product__delivery__txt\">\n              <span>\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u0439 \u043F\u043B\u0430\u0442\u0435\u0436</span><br />\n              \u041F\u0440\u0438 \u043E\u043F\u043B\u0430\u0442\u0435 \u043D\u0430\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u043C \u043F\u043B\u0430\u0442\u0435\u0436\u043E\u043C\n              \u0412\u044B \u043E\u043F\u043B\u0430\u0447\u0438\u0432\u0430\u0435\u0442\u0435: \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0442\u043E\u0432\u0430\u0440\u0430 + \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0443 43 \u0433\u0440\u043D + \u043D\u0430\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u0439 \u043F\u043B\u0430\u0442\u0435\u0436 20 \u0433\u0440\u043D + 2% \u043E\u0442 \u0441\u0443\u043C\u043C\u044B \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0430\n            </p>\n            <p class=\"product__delivery__txt\">\n              <span>\u041E\u043F\u043B\u0430\u0442\u0430 \u043D\u0430 \u043A\u0430\u0440\u0442\u0443</span><br />\n              \u041F\u0440\u0438 \u043E\u043F\u043B\u0430\u0442\u0435 \u043D\u0430 \u043A\u0430\u0440\u0442\u0443, \u0412\u044B \u043E\u043F\u043B\u0430\u0447\u0438\u0432\u0430\u0435\u0442\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u0430 + 43 \u0433\u0440\u043D \u0437\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0443\n            </p>\n            <p class=\"product__delivery__txt\">\n              <span>\u041E\u043F\u043B\u0430\u0442\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438</span><br />\n              \u041E\u043F\u043B\u0430\u0442\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0437\u0430\u043A\u0430\u0437\u0430 \u0441\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u0430 + \u0443\u0441\u043B\u0443\u0433\u0438 \u043A\u0443\u0440\u044C\u0435\u0440\u0430 (\u043E\u043A\u043E\u043B\u043E 100 \u0433\u0440\u043D)\n            </p>\n          </div>\n        </div>\n      </div>\n      <div data-size class=\"about-product__size mobile-visible\">\n        <div class=\"about-product__size-close\">\n          <i></i>\n          <i></i>\n        </div>\n        <p class=\"title-default title-black\">\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u0432\u044B\u0431\u0438\u0440\u0438\u0442\u0435 \u0440\u0430\u0437\u043C\u0435\u0440</p>\n        <div data-mobile-size>\n        </div>\n      </div>\n      <div data-color class=\"about-product__size mobile-visible\">\n        <div class=\"about-product__size-close\">\n          <i></i>\n          <i></i>\n        </div>\n        <p class=\"title-default title-black\">\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u0432\u044B\u0431\u0438\u0440\u0438\u0442\u0435 \u0446\u0432\u0435\u0442</p>\n        <div data-mobile-color>\n        </div>\n      </div>\n    ");
      var swiperWrapperMobile = document.querySelector('.swiper-wrapper-images-mobile'),
          buttonBackModal = document.querySelectorAll('.about-product__back');
      buttonBackModal.forEach(function (btn) {
        btn.addEventListener('click', function () {
          history.pushState('', document.title, window.location.pathname);
          aboutProduct.classList.toggle('_activePopUp');
          document.body.style.overflow = 'auto';
        });
      });
      var colorMobile = document.querySelector('[data-mobile-color]'),
          sizeMobile = document.querySelector('[data-mobile-size]');
      colorArr.forEach(function (color) {
        var selectOption = document.createElement('p');
        selectOption.classList.add('select__option');
        selectOption.innerHTML = "\n          ".concat(color, "\n        ");
        colorMobile.appendChild(selectOption);
      });
      sizeArr.forEach(function (size) {
        var selectOption = document.createElement('p');
        selectOption.classList.add('select__option');
        selectOption.innerHTML = "\n          ".concat(size, "\n        ");
        sizeMobile.appendChild(selectOption);
      });
      item.images.forEach(function (img) {
        for (var key in img) {
          var imagesMobile = document.createElement('a');
          var imagesMobileCrumbs = document.createElement('div');
          imagesMobile.classList.add('swiper-slide', 'glightbox');
          imagesMobile.setAttribute('style', "background-image: url('".concat(img[key], "')"));
          imagesMobile.setAttribute('data-src', img[key]);
          imagesMobile.setAttribute('data-gallery', item.name);
          imagesMobile.setAttribute('href', img[key]);
          imagesMobileCrumbs.classList.add('swiper-slide');
          imagesMobileCrumbs.setAttribute('style', "background-image: url('".concat(img[key], "')"));
          swiperWrapperMobile.appendChild(imagesMobile);
        }
      });
      var galleryTop2 = new Swiper('.gallery-topTwo', {
        slidesPerView: 1,
        grabCursor: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      });
      var lightbox = GLightbox({
        touchNavigation: true,
        loop: true
      });
      Object(_select__WEBPACK_IMPORTED_MODULE_0__["default"])();
      var basketAppend = document.querySelector('.box-basket__container'),
          buttonClose = document.querySelector('.box-basket__head'),
          modalWindow = document.querySelector('.box-basket');
      buttonClose.addEventListener('click', function () {
        modalWindow.classList.remove('box-basket_active');
        document.body.style.overflow = 'auto';
      });
      var aboutBox = document.querySelector('.about-product');
      Object(_about_add_cart__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-about-add-mobile]', '[data-mobile-size]', '.about-product__size-close');
      var dedline = '2021-01-15';
      item.timer ? Object(_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', dedline) : null;
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (createAbout);

/***/ }),

/***/ "./src/js/modules/createPost.js":
/*!**************************************!*\
  !*** ./src/js/modules/createPost.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var createPost = function createPost(response, appendBox) {
  var topBrand = document.querySelector('.top-brand-append');
  response.forEach(function (item, i) {
    var product = document.createElement('div');

    var priceWithoutSpacer = function priceWithoutSpacer(string) {
      return string.replace(/\s/g, '');
    };

    var normalPrice = function normalPrice(string) {
      return String(string).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    };

    var procentSale = normalPrice(parseInt((parseInt(priceWithoutSpacer(item.sale)) - parseInt(priceWithoutSpacer(item.price))) / parseInt(priceWithoutSpacer(item.sale)) * 100));
    product.classList.add('cart-product');
    product.setAttribute('data-id', item.id);
    product.setAttribute('data-add', '');

    if (item.top) {
      var productTopBrand = document.createElement('div');
      productTopBrand.classList.add('swiper-slide');
      productTopBrand.innerHTML = "\n        <div data-add data-id=".concat(item.id, " class=\"top-brand__brand hover\">\n          <img src=\"").concat(item.images[0].img1, "\" alt=\"").concat(item.images[0].img1, "\" />\n          <svg data-about data-v-96ce721e=\"\" width=\"23\" height=\"24\" viewBox=\"0 0 23 24\" fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\">\n            <path data-v-96ce721e=\"\"\n              d=\"M0.468382 23.074C0.369775 23.074 0.172562 23.074 0.073955 22.9754C-0.0246517 22.6795 -0.0246517 22.3837 0.073955 22.1865L22.1618 0.0986132C22.3591 6.54347e-06 22.6549 6.54347e-06 22.8521 0.0986132C23.0493 0.19722 23.0493 0.591646 22.8521 0.78886L0.862808 22.8767C0.764201 22.9754 0.566988 23.074 0.468382 23.074Z\"\n              fill=\"white\" fill-opacity=\"0.45\"></path>\n            <path data-v-96ce721e=\"\"\n              d=\"M22.5567 18.4394C22.2609 18.4394 22.0637 18.2422 22.0637 17.9464V0.986066H5.00475C4.80754 0.986066 4.51172 0.788853 4.51172 0.493033C4.51172 0.197213 4.80754 0 5.00475 0H22.4581C22.5567 0 22.7539 0.0986066 22.8526 0.0986066C22.9512 0.0986066 22.9512 0.29582 22.9512 0.493033V17.9464C23.0498 18.2422 22.7539 18.4394 22.5567 18.4394Z\"\n              fill=\"white\" fill-opacity=\"0.45\"></path>\n          </svg>\n          <p class=\"top-brand__brand-number hover\">").concat(i, "</p>\n          <p class=\"top-brand__brand-title hover\">").concat(item.name, "</p>\n          <p class=\"top-brand__brand-price hover\">").concat(item.price, " \u0433\u0440\u043D</p>\n          <a data-id=\"").concat(item.id, "\" href=\"#\" class=\"top-brand__brand-button button-link\">\u0414\u043E\u0431\u0430\u0432\u0438\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</a>\n        </div>\n      ");
      topBrand.appendChild(productTopBrand);
      var swiper = new Swiper('.top-brand__slider .swiper-container', {
        autoplay: {
          delay: 8000
        },
        allowTouchMove: false,
        loop: false,
        spaceBetween: 5,
        navigation: {
          nextEl: '.top-brand__next',
          prevEl: '.top-brand__prev'
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1.2,
            centeredSlides: true
          },
          661: {
            slidesPerView: 2,
            allowTouchMove: true
          },
          // when window width is >= 480px
          1024: {
            slidesPerView: 2.3
          },
          // when window width is >= 640px
          1500: {
            slidesPerView: 2.7
          }
        }
      });
    }

    product.innerHTML = "\n      <div class=\"cart-product__image\">\n        <img src=\"".concat(item.images[0].img1, "\" alt=\"product ").concat(item.images[0].img1, "\" class=\"cart-product__image-original\"/>\n        ").concat(item.timer ? "<div class=\"sale-procent\">-".concat(procentSale, "%</div>") : '', "\n      </div>\n      <div class=\"cart-product__description\">\n        <div class=\"cart-product__container\">\n          <p class=\"cart-product__name\">").concat(item.name, "</p>\n          <p class=\"cart-product__list\"><span>\u0422\u043A\u0430\u043D\u044C:</span> ").concat(item.cloth, "</p>\n          <p class=\"cart-product__list\"><span>\u0426\u0432\u0435\u0442\u0430:</span> ").concat(item.color, "</p>\n          <p class=\"cart-product__list cart-product__list_mobile\"><span>\u0420\u0430\u0437\u043C\u0435\u0440:</span> ").concat(item.allSize, "</p>\n        </div>\n        <div class=\"cart-product__container-bottom\">\n          ").concat(item.timer ? "" : '', "<p class=\"cart-product__price\">").concat(item.price, " \u0433\u0440\u043D. ").concat(item.timer ? "<span class=\"sale\">".concat(item.sale, " \u0433\u0440\u043D.</span>") : '', "</p>\n          <div class=\"cart-product__button\">\n            <a data-id=\"").concat(item.id, "\" data-about href=\"#\" class=\"button-more\">\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435</a>\n            <a data-id=\"").concat(item.id, "\" href=\"#\" class=\"button-more button-buy\">\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C</a>\n          </div>\n        </div>\n      </div>\n    ");
    appendBox.appendChild(product);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (createPost);

/***/ }),

/***/ "./src/js/modules/input.js":
/*!*********************************!*\
  !*** ./src/js/modules/input.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var inputAnimation = function inputAnimation() {
  var input = document.querySelectorAll('.form-send__input-input');
  input.forEach(function (inp) {
    inp.addEventListener('focus', function () {
      inp.previousElementSibling.classList.add('_active-focus');
    });
    inp.addEventListener('blur', function () {
      inp.previousElementSibling.classList.remove('_active-focus');
      inp.value == "" ? inp.previousElementSibling.classList.remove('_active-focus') : inp.previousElementSibling.classList.add('_active-focus');
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (inputAnimation);

/***/ }),

/***/ "./src/js/modules/menu-change.js":
/*!***************************************!*\
  !*** ./src/js/modules/menu-change.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var menuChange = function menuChange() {
  var socialMediaBox = document.querySelector('.header__vertial-social'),
      burger = document.querySelector('.header__vertial-burger'),
      logo = document.querySelector('.header__vertial-logo'),
      MainScreen = document.querySelector('.main-screen'),
      headerVertical = document.querySelector('.header__vertial'),
      aboutBox = document.querySelector('.about'),
      basketMobile = document.querySelector('.header__basket-mobile');

  if ((window.innerWidth || document.documentElement.clientWidth) > 850) {
    document.addEventListener('scroll', function () {
      MainScreen.getBoundingClientRect().top <= -57 ? socialMediaBox.classList.add('dSocial') : socialMediaBox.classList.remove('dSocial');
      MainScreen.getBoundingClientRect().top <= -400 ? burger.classList.add('dBurger') : burger.classList.remove('dBurger');
      MainScreen.getBoundingClientRect().top <= -700 ? logo.classList.add('dLogo') : logo.classList.remove('dLogo');
      aboutBox.getBoundingClientRect().top <= 630 && aboutBox.getBoundingClientRect().top >= 271 ? socialMediaBox.classList.add('dSocial2') : socialMediaBox.classList.remove('dSocial2');
      aboutBox.getBoundingClientRect().top <= 390 && aboutBox.getBoundingClientRect().top >= -105 ? burger.classList.add('dBurger2') : burger.classList.remove('dBurger2');
      aboutBox.getBoundingClientRect().top <= 50 && aboutBox.getBoundingClientRect().top >= -350 ? logo.classList.add('dLogo2') : logo.classList.remove('dLogo2');
    });
  } else {
    document.addEventListener('scroll', function () {
      if (document.documentElement.scrollTop >= 130) {
        headerVertical.classList.add('_activeHeader');
        burger.classList.add('dBurger');
        logo.classList.add('dLogo');
        basketMobile.classList.add('dBasket');
      } else {
        headerVertical.classList.remove('_activeHeader');
        burger.classList.remove('dBurger');
        logo.classList.remove('dLogo');
        basketMobile.classList.remove('dBasket');
      }
    });
  }
};

/* harmony default export */ __webpack_exports__["default"] = (menuChange);

/***/ }),

/***/ "./src/js/modules/menu-scroll.js":
/*!***************************************!*\
  !*** ./src/js/modules/menu-scroll.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var menuScroll = function menuScroll() {
  var navBox = document.querySelector('.nav'),
      menuBox = document.querySelector('.menu'),
      burgerBox = document.querySelector('.header__vertial');
  var links = document.querySelectorAll('[href^="#tab"]'),
      speed = 0.05;
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      navBox.classList.remove('nav-active');
      menuBox.classList.remove('menu-active');
      burgerBox.classList.remove('header__vertial-active'); // navBox.childNodes[0].classList.remove('menu-active');

      e.preventDefault();
      var self = e.currentTarget;
      var widthTop = document.documentElement.scrollTop,
          hash = self.hash,
          toBlock = document.querySelector(hash).getBoundingClientRect().top,
          start = null;
      requestAnimationFrame(step);

      function step(time) {
        if (start === null) {
          start = time;
        }

        var progress = time - start,
            r = toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock);
        document.documentElement.scrollTo(0, r);

        if (r != widthTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          history.pushState("", document.title, window.location.pathname);
        }
      }
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (menuScroll);

/***/ }),

/***/ "./src/js/modules/menu.js":
/*!********************************!*\
  !*** ./src/js/modules/menu.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var menu = function menu() {
  var burgerButton = document.querySelectorAll('.header__vertial-burger'),
      navMenu = document.querySelector('.nav'),
      boxMenu = document.querySelector('.menu'),
      verticalMenu = document.querySelectorAll('.header__vertial');
  burgerButton.forEach(function (button) {
    button.addEventListener('click', function () {
      verticalMenu.forEach(function (menuChange) {
        return menuChange.classList.toggle('header__vertial-active');
      });
      navMenu.classList.toggle('nav-active');
      boxMenu.classList.toggle('menu-active');
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (menu);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_about__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-about */ "./src/js/modules/create-about.js");


var modal = function modal(triggerOpen, triggerClose, modalWindow, response2) {
  var buttonOpen = document.querySelectorAll(triggerOpen),
      buttonClose = document.querySelectorAll(triggerClose),
      popUp = document.querySelector(modalWindow),
      popUpAbout = document.querySelector('.box-basket'),
      buttonBack = document.querySelectorAll('.about-product__back'),
      topBrands = document.querySelectorAll('.top-brand__brand');
  buttonOpen.forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      popUp.classList.add('_activePopUp');
      document.body.style.overflow = "hidden";
      Object(_create_about__WEBPACK_IMPORTED_MODULE_0__["default"])(response2, button.getAttribute('data-id'));
    });
    button.parentNode.parentNode.parentNode.parentNode.addEventListener('click', function (e) {
      if (e.target.closest('.cart-product')) {
        if (!e.target.closest('.button-buy')) {
          popUp.classList.add('_activePopUp');
          document.body.style.overflow = "hidden";
          Object(_create_about__WEBPACK_IMPORTED_MODULE_0__["default"])(response2, button.getAttribute('data-id'));
        }
      }
    });
  });
  topBrands.forEach(function (prd) {
    prd.addEventListener('click', function (e) {
      if (!e.target.classList.contains('top-brand__brand-button')) {
        Object(_create_about__WEBPACK_IMPORTED_MODULE_0__["default"])(response2, prd.getAttribute('data-id'));
        popUp.classList.add('_activePopUp');
        document.body.style.overflow = "hidden";
      }
    });
  });
  buttonClose.forEach(function (buttonBack) {
    buttonBack.addEventListener('click', function (e) {
      e.preventDefault();
      popUp.classList.remove('_activePopUp');
      popUpAbout.classList.remove('box-basket_active');
      document.body.style.overflow = "auto";
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (modal);

/***/ }),

/***/ "./src/js/modules/modalCart.js":
/*!*************************************!*\
  !*** ./src/js/modules/modalCart.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var modalCart = function modalCart() {
  var buttonClick = document.querySelector('[data-basket-desk]'),
      buttonClose = document.querySelector('.box-basket__head'),
      modalWindow = document.querySelector('.payment'),
      buttonClickMob = document.querySelector('[data-bask-mob]'),
      popUp = document.querySelector('.about-product');
  buttonClick.addEventListener('click', function (e) {
    e.preventDefault();
    modalWindow.classList.add('payment_active');
    document.body.style.overflow = 'hidden';
  });
  buttonClickMob.addEventListener('click', function (e) {
    e.preventDefault();
    modalWindow.classList.add('payment_active');
    document.body.style.overflow = 'hidden';
  });
  buttonClose.addEventListener('click', function (e) {
    e.preventDefault();
    modalWindow.classList.remove('payment_active');
    popUp.classList.remove('_activePopUp');
    document.body.style.overflow = 'auto';
  });
};

/* harmony default export */ __webpack_exports__["default"] = (modalCart);

/***/ }),

/***/ "./src/js/modules/open-form.js":
/*!*************************************!*\
  !*** ./src/js/modules/open-form.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _thank_you__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./thank-you */ "./src/js/modules/thank-you.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var openForm = function openForm() {
  var sendFormWindowm = document.querySelector('.payment'),
      finalPriceInput = document.querySelector('[data-price-final]'),
      buttonClose = document.querySelectorAll('.payment__close'),
      buttonSend = document.querySelector('.form-send'),
      simpleBar = document.querySelector('.payment__simplebar .simplebar-content'),
      preloader = document.querySelector('.loadingio-spinner-spin-lxnq5mfl78');
  preloader.style.display = "none";
  var productsArray = [];

  var priceWithoutSpacer = function priceWithoutSpacer(string) {
    return string.replace(/\s/g, '');
  };

  var normalPrice = function normalPrice(string) {
    return String(string).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  };

  var dataProducts = function dataProducts() {
    var productArr = simpleBar.querySelectorAll('.payment__product');

    var _iterator = _createForOfIteratorHelper(productArr),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        var info = item.querySelector('.payment__product-info');
        var id = item.getAttribute('data-id');
        var name = info.querySelector('.payment__product-name').textContent;
        var size = info.querySelector('.payment__product-size').textContent;
        var color = info.querySelector('.payment__product-color').textContent;
        var amout = info.querySelector('.payment__product-price').textContent;
        color = color.replace('Цвет:', '');
        size = size.replace('Размер:', '');
        amout = amout.replace('Цена:', '');
        var priceInput = parseInt(finalPriceInput.value);
        priceInput += parseInt(amout);
        finalPriceInput.value = normalPrice(priceInput);
        var obj = {};
        obj.id = id;
        obj.name = name;
        obj.size = size;
        obj.color = color;
        obj.amout = amout;
        productsArray.push(obj);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  buttonClose.forEach(function (item) {
    item.addEventListener('click', function () {
      sendFormWindowm.classList.remove('payment_active');
      document.body.style.overflow = '';
    });
  });
  buttonSend.addEventListener('submit', function (e) {
    preloader.style.display = 'flex';
    e.preventDefault();
    dataProducts();
    var productLenght = productsArray.length;
    var self = e.currentTarget;
    var formData = new FormData(self);
    var name = self.querySelector('[name="fName"]').value;
    var phone = self.querySelector('[name="phone"]').value;
    var fullPrice = self.querySelector('[name="finalPriceFF"]').value;
    formData.append('products', JSON.stringify(productsArray));
    formData.append('fName', name);
    formData.append('phone', phone);
    formData.append('fullPrice', fullPrice);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 404) {
          history.pushState("", document.title, window.location.pathname);
          var newurl = window.location.href + "error";
          window.history.pushState({
            path: newurl
          }, '', newurl);
          Object(_thank_you__WEBPACK_IMPORTED_MODULE_0__["default"])();
          preloader.style.display = 'none';
        }

        if (xhr.status === 200) {
          self.reset();
          preloader.style.display = 'none';
          history.pushState("", document.title, window.location.pathname);
          localStorage.removeItem('cart');

          var _newurl = window.location.href + "thank-you";

          window.history.pushState({
            path: _newurl
          }, '', _newurl);
          console.log(formData);
          Object(_thank_you__WEBPACK_IMPORTED_MODULE_0__["default"])();
          fbq('track', 'Lead');
        }
      }
    };

    xhr.open('POST', 'order.php', true);
    xhr.send(formData);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (openForm);

/***/ }),

/***/ "./src/js/modules/open-product.js":
/*!****************************************!*\
  !*** ./src/js/modules/open-product.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_about__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-about */ "./src/js/modules/create-about.js");


var openProductLink = function openProductLink(res) {
  var about = document.querySelector('.about-product');

  if (!window.location.hash.length == 0) {
    about.classList.add('_activePopUp');
    var idProd = window.location.hash.replace(/\D+/g, '');
    Object(_create_about__WEBPACK_IMPORTED_MODULE_0__["default"])(res, idProd);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (openProductLink);

/***/ }),

/***/ "./src/js/modules/renderProduct.js":
/*!*****************************************!*\
  !*** ./src/js/modules/renderProduct.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createPost__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createPost */ "./src/js/modules/createPost.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modalCart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modalCart */ "./src/js/modules/modalCart.js");
/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cart */ "./src/js/modules/cart.js");
/* harmony import */ var _animated__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./animated */ "./src/js/modules/animated.js");
/* harmony import */ var _open_product__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./open-product */ "./src/js/modules/open-product.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








var renderProduct = function renderProduct() {
  var catalogBox = document.querySelector('.catalog__render'),
      modalBox = document.querySelector('.about-product');

  var getResource = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(url) {
      var res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch("".concat(url));

            case 2:
              res = _context.sent;

              if (res.ok) {
                _context.next = 5;
                break;
              }

              throw new Error("\u041E\u0448\u0438\u0431\u043A\u0430 ".concat(url, ", status: ").concat(res.status));

            case 5:
              _context.next = 7;
              return res.json();

            case 7:
              return _context.abrupt("return", _context.sent);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getResource(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  getResource('http://localhost:3000/catalog').then(function (data) {
    Object(_createPost__WEBPACK_IMPORTED_MODULE_1__["default"])(data.product, catalogBox);
    Object(_open_product__WEBPACK_IMPORTED_MODULE_6__["default"])(data.product);
    Object(_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-about]', '.product__header-back', '.about-product', data.product, modalBox);
    Object(_cart__WEBPACK_IMPORTED_MODULE_4__["default"])(data.product);
    Object(_modalCart__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (window.innerWidth || document.documentElement.clientWidth) > 850 ? Object(_animated__WEBPACK_IMPORTED_MODULE_5__["default"])() : null;
  })["catch"](function (err) {
    return console.error(err);
  });
};

/* harmony default export */ __webpack_exports__["default"] = (renderProduct);

/***/ }),

/***/ "./src/js/modules/select.js":
/*!**********************************!*\
  !*** ./src/js/modules/select.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var select = function select() {
  var selectElement = document.querySelectorAll('.select'),
      optionActive = document.querySelectorAll('.option-active'),
      selectOption = document.querySelectorAll('.select__option');
  selectElement.forEach(function (item) {
    item.childNodes[2].nextSibling.addEventListener('click', function (e) {
      e.target.classList.toggle('option-active_active');
      e.target.nextElementSibling.classList.toggle('select__body_active');
    });
  });
  selectOption.forEach(function (option) {
    option.addEventListener('click', function (e) {
      var valueOption = e.target.innerHTML;
      e.target.parentNode.classList.toggle('select__body_active');
      e.target.parentNode.previousElementSibling.classList.toggle('option-active_active');
      e.target.parentNode.previousElementSibling.setAttribute('data-value', valueOption);
      if (!e.target.parentNode.previousElementSibling.childNodes[1]) return;
      e.target.parentNode.previousElementSibling.childNodes[1].textContent = valueOption;
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (select);

/***/ }),

/***/ "./src/js/modules/sliders.js":
/*!***********************************!*\
  !*** ./src/js/modules/sliders.js ***!
  \***********************************/
/*! exports provided: mainPageSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mainPageSlider", function() { return mainPageSlider; });
var mainPageSlider = function mainPageSlider() {
  var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 2,
    speed: 600,
    loop: true,
    freeMode: true,
    loopedSlides: 5,
    watchSlidesVisibility: true,
    watchSlidesProgress: true
  });
  var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    autoplay: {
      delay: 15000
    },
    speed: 1000,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    loopedSlides: 1,
    //looped slides should be the same
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    thumbs: {
      swiper: galleryThumbs
    }
  });
  var swiperTwo = new Swiper('.look__slider .swiper-container', {
    autoplay: {
      delay: 10000
    },
    speed: 1000,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction'
    }
  });
};

/***/ }),

/***/ "./src/js/modules/thank-you.js":
/*!*************************************!*\
  !*** ./src/js/modules/thank-you.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var thanks = function thanks() {
  var thankBox = document.querySelector('[data-thanks]'),
      thanksButtonClose = document.querySelectorAll('[data-close-thanks]'),
      errorBox = document.querySelector('.modal-error');

  if (window.location.pathname == '/thank-you') {
    thankBox.classList.add('thank-you_active');
    thanksButtonClose.forEach(function (button) {
      button.addEventListener('click', function () {
        thankBox.classList.remove('thank-you_active');
        window.location.pathname = "/";
      });
    });
  }

  if (window.location.pathname == '/error') {
    errorBox.classList.add('modal-error_active');
    thanksButtonClose.forEach(function (button) {
      button.addEventListener('click', function () {
        errorBox.classList.remove('modal-error_active');
        window.location.pathname = "/";
      });
    });
  }
};

/* harmony default export */ __webpack_exports__["default"] = (thanks);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var timer = function timer(id, dedline) {
  var addZero = function addZero(num) {
    if (num <= 9) {
      return "0".concat(num);
    } else {
      return num;
    }
  };

  var getTimeRemaining = function getTimeRemaining(endTime) {
    var t = Date.parse(endTime) - Date.parse(new Date()),
        seconds = Math.floor(t / 1000 % 60),
        minutes = Math.floor(t / 1000 / 60 % 60),
        house = Math.floor(t / (1000 * 60 * 60) % 24),
        days = Math.floor(t / (1000 * 60 * 60 * 24) % 24);

    if (t <= 0) {
      var plusWhile = Date.parse(endTime),
          i = Date.parse(new Date());

      do {
        plusWhile += 10800000;
      } while (plusWhile < i);

      console.log(plusWhile);
      t = plusWhile - Date.parse(new Date()), seconds = Math.floor(t / 1000 % 60), minutes = Math.floor(t / 1000 / 60 % 60), house = Math.floor(t / (1000 * 60 * 60) % 24), days = Math.floor(t / (1000 * 60 * 60 * 24) % 24);
      return {
        'total': t,
        'days': days,
        "house": house,
        "minutes": minutes,
        "seconds": seconds
      };
    } else {
      console.log('Не запуск');
      t = Date.parse(endTime) - Date.parse(new Date()), seconds = Math.floor(t / 1000 % 60), minutes = Math.floor(t / 1000 / 60 % 60), house = Math.floor(t / (1000 * 60 * 60) % 24), days = Math.floor(t / (1000 * 60 * 60 * 24) % 24);
      return {
        'total': t,
        'days': days,
        "house": house,
        "minutes": minutes,
        "seconds": seconds
      };
    }
  };

  var setClock = function setClock(selector, endTime) {
    var timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        house = timer.querySelector('#house'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      var t = getTimeRemaining(endTime);
      days.textContent = addZero(t.days);
      house.textContent = addZero(t.house);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      if (t.total <= 0) {
        t = getTimeRemaining(endTime);
      }
    }

    ;
  };

  setClock(id, dedline);
};

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./src/js/modules/validation.js":
/*!**************************************!*\
  !*** ./src/js/modules/validation.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var validation = function validation() {
  var form = document.querySelector('.payment__container'),
      presonData = document.querySelector('.form-send__person-data'),
      deliveriData = document.querySelector('.form-send__delivery'),
      buttonNext = document.querySelectorAll('.validation'),
      inputsPerson = presonData.querySelectorAll('input'),
      crumbsLd = document.querySelector('[data-ld]'),
      crumbsOrder = document.querySelector('[data-order]'),
      inputName = document.querySelector('[data-name-input]'),
      inputTel = document.querySelector('[data-tel]'),
      backPerson = document.querySelector('.back-in-person');
  buttonNext.forEach(function (btn) {
    btn.disable = true;
    btn.style.opacity = 0.2;
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      if (inputName.value.length <= 0) {
        btn.disable = true;
        btn.style.opacity = 0.2;
        inputName.parentNode.classList.add('fail');
      }

      if (inputTel.value.length <= 0) {
        btn.disable = true;
        btn.style.opacity = 0.2;
        inputTel.parentNode.classList.add('fail');
      }

      if (!inputName.value.length <= 0 && !inputTel.value.length <= 0) {
        presonData.classList.add('form-send__person-data_hidden');
        deliveriData.classList.add('form-send__delivery_visible');
        btn.disable = false;
        btn.style.opacity = 1;
        crumbsLd.classList.remove('payment__crumbs-active');
        crumbsOrder.classList.add('payment__crumbs-active');
      }
    });
    inputName.addEventListener('input', function (e) {
      var self = e.currentTarget;

      if (!inputName.value.length <= 0) {
        btn.disable = false;
        btn.style.opacity = 1;
        inputName.parentNode.classList.remove('fail');
      } else {
        btn.disable = true;
        btn.style.opacity = 0.2;
      }
    });
    inputTel.addEventListener('input', function (e) {
      var self = e.currentTarget;

      if (!inputTel.value.length <= 0) {
        btn.disable = false;
        btn.style.opacity = 1;
        inputTel.parentNode.classList.remove('fail');
      }
    });
  });
  crumbsOrder.addEventListener('click', function () {
    if (!inputName.value.length <= 0 && !inputTel.value.length <= 0) {
      presonData.classList.add('form-send__person-data_hidden');
      deliveriData.classList.add('form-send__delivery_visible');
      crumbsLd.classList.remove('payment__crumbs-active');
      crumbsOrder.classList.add('payment__crumbs-active');
    } else if (inputName.value.length == 0 && inputTel.value.length !== 0) {
      inputName.parentNode.classList.add('fail');
    } else if (inputTel.value.length == 0 && !inputName.value.length == 0) {
      inputTel.parentNode.classList.add('fail');
    } else {
      inputName.parentNode.classList.add('fail');
      inputTel.parentNode.classList.add('fail');
    }
  });
  crumbsLd.addEventListener('click', function () {
    presonData.classList.remove('form-send__person-data_hidden');
    deliveriData.classList.remove('form-send__delivery_visible');
    crumbsLd.classList.add('payment__crumbs-active');
    crumbsOrder.classList.remove('payment__crumbs-active');
  }); // backPerson.addEventListener('click', () => {
  //   presonData.classList.remove('form-send__person-data_hidden');
  //   deliveriData.classList.remove('form-send__delivery_visible');
  // });
  // mask

  var im = new Inputmask('+38 (999) 999-99-99');
  im.mask(inputTel);
};

/* harmony default export */ __webpack_exports__["default"] = (validation);

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***************************************************!*\
  !*** multi ./src/js/main.js ./src/scss/main.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/ilakl/WebstormProjects/estetic-shop/front-end/src/js/main.js */"./src/js/main.js");
module.exports = __webpack_require__(/*! /Users/ilakl/WebstormProjects/estetic-shop/front-end/src/scss/main.scss */"./src/scss/main.scss");


/***/ })

/******/ });