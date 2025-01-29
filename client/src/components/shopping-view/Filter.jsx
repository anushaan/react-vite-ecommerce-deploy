import { filterOptions } from "@/config";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Fragment } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const ProductFilter = ({ filter, handleFilter }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    className="flex items-center gap-2 font-medium"
                    key={option.id}
                  >
                    <Checkbox
                      checked={
                        filter &&
                        Object.keys(filter).length > 0 &&
                        filter[keyItem] &&
                        filter[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
              <div>
                <Separator />
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
