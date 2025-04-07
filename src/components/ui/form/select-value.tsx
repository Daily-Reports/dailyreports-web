import Select from "react-select";

type Option<T> = {
    value: T | null;
    label: string;
};

type SelectValueProps<T> = {
    title: string;
    placeholder: string;
    options: Option<T>[];
    selectValue: T | null;
    setSelectValue: (value: T | null) => void;
    compareFn: (a: T, b: T) => boolean;
}

const SelectValue = <T, >({
                              title,
                              placeholder,
                              options,
                              selectValue,
                              setSelectValue,
                              compareFn = (a, b) => a === b,
                              ...rest
                          }: SelectValueProps<T>) => {

    const selectedOption = options.find(
        (opt) => opt.value !== null && selectValue !== null && compareFn(opt.value, selectValue)
    ) ?? null;

    return (
        <div className="App">
            <h2 className="text-lg text-gray-600 mt-3 text-left">{title}</h2>
            <Select<Option<T>, false>
                value={selectedOption}
                onChange={(option) => setSelectValue(option ? option.value : null)}
                options={options}
                placeholder={placeholder}
                styles={{
                    control: (base, state) => ({
                        ...base,
                        minWidth: 200,
                        boxShadow: state.isFocused ? "0 0 0 1px black" : "none",
                        outline: "none",
                        borderWidth: "1px",
                        borderColor: state.isFocused ? "black" : base.borderColor,
                        "&:focus": {outline: "black"},
                        "&:hover": {borderColor: "none"},
                    }),
                }}
                {...rest}
            />
        </div>
    );
};

export default SelectValue;