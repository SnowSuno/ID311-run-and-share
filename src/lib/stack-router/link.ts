export function stackLink (node, opts) {
  opts = linkOpts(opts);

  // Only apply to <a> tags
  if (!node || !node.tagName || node.tagName.toLowerCase() != "a") {
    throw Error("Action \"link\" can only be used with <a> tags");
  }

  updateLink(node, opts);

  return {
    update (updated) {
      updated = linkOpts(updated);
      updateLink(node, updated);
    }
  };
}

function updateLink (node, opts) {
  let href = opts.href || node.getAttribute("href");

  // Destination must start with '/' or '#/'
  if (href && href.charAt(0) == "/") {
    // Add # to the href attribute
    href = "#/?stack=" + href.substring(1);
  } else if (!href || href.length < 2 || href.slice(0, 2) != "#/") {
    throw Error("Invalid value for \"href\" attribute: " + href);
  }

  node.setAttribute("href", href);
  node.addEventListener("click", (event) => {
    // Prevent default anchor onclick behaviour
    event.preventDefault();
    if (!opts.disabled) {
      scrollstateHistoryHandler(event.currentTarget.getAttribute("href"));
    }
  });
}

// Internal function that ensures the argument of the link action is always an object
function linkOpts (val) {
  if (val && typeof val == "string") {
    return {
      href: val
    };
  } else {
    return val || {};
  }
}

function scrollstateHistoryHandler (href) {
  // Setting the url (3rd arg) to href will break clicking for reasons, so don't try to do that
  history.replaceState({
    ...history.state,
    __svelte_spa_router_scrollX: window.scrollX,
    __svelte_spa_router_scrollY: window.scrollY
  }, undefined);
  // This will force an update as desired, but this time our scroll state will be attached
  window.location.hash = href;
}
