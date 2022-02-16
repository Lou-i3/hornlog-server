import { extendType, nonNull, objectType } from "nexus"

export const CheckQuery = extendType({
    type: "Query",
    definition(t) {
        t.string('ok', {
            resolve: () => "At least this is working 🤣"
        })
    }
})