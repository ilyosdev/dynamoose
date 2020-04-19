const utils = require("../utils");
const internalProviders = require("./internal_providers");
let providers = [];

// This method takes the provider and converts it to an internal provider if exists (ex. `console`)
const normalizeProvider = (provider) => {
	if (provider === console) {
		return new internalProviders.console();
	} else {
		return provider;
	}
};

module.exports = {
	"set": (provider) => {
		if (typeof provider === "undefined" || provider === null) {
			provider = [];
		}

		providers = (Array.isArray(provider) ? provider : [provider]).map(normalizeProvider);
	},
	"clear": () => {
		providers = [];
	},
	"add": (provider) => {
		const newProviders = (Array.isArray(provider) ? provider : [provider]).map(normalizeProvider);
		providers.push(...newProviders);
	},
	"delete": (id) => {
		const deleteFunction = (id) => {
			const index = providers.findIndex((provider) => provider.id === id);
			utils.object.delete(providers, index);
		};
		if (Array.isArray(id)) {
			id.forEach((id) => deleteFunction(id));
		} else {
			deleteFunction(id);
		}
	},
	"list": () => providers
};