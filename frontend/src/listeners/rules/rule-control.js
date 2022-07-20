import ruleset  from "listeners/rules/ruleset"

class RuleControl {

    findAll(attribute = '') {
        if (attribute) return ruleset.filter(obj =>  obj.field == attribute)
        return ruleset
    }

}

export default (new RuleControl())

