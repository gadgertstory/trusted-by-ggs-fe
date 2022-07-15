import React, { Component } from "react";
import { PropTypes } from "prop-types";
import ReactAutocomplete from "react-autocomplete";

import {
    searchAddressByDistrict,
    searchAddressByAmphoe,
    searchAddressByProvince,
    searchAddressByZipcode,
} from "thai-address-database";

class ThailandAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            emptyZipcode: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handelSelect = this.handelSelect.bind(this);
    }

    finder = (searchBy, txt) => {
        const { maxResult } = this.props;
        switch (searchBy) {
            case "subdistrict":
                return searchAddressByDistrict(txt).slice(0, maxResult);
            case "district":
                return searchAddressByAmphoe(txt).slice(0, maxResult);
            case "province":
                return searchAddressByProvince(txt).slice(0, maxResult);
            case "zipcode":
                return searchAddressByZipcode(txt).slice(0, maxResult);
            default:
                return [];
        }
    };

    handleChange(e, value) {
        const field = this.props.address;
        e.target.name = field;
        const { delimiter, filter, onChange } = this.props;

        if (onChange) onChange(e);
        value = e.target.value;

        const foundData = this.finder(field, value);
        const filtered = filter ? foundData.filter(filter) : foundData;
        this.setState({
            options: filtered.map((item, key) => {
                return {
                    key,
                    label: `${item.district}${delimiter}${item.amphoe}${delimiter}${item.province}${delimiter}${item.zipcode}`,
                };
            }),
        });
    }

    handelSelect(value) {
        const { delimiter } = this.props;
        const address = value.split(delimiter.length > 0 ? delimiter : ", ");
        if (this.props.onSelect)
            this.props.onSelect({
                subdistrict: address[0],
                district: address[1],
                province: address[2],
                zipcode: address[3],
            });
    }

    render() {
        const { options } = this.state;
        return (
            <div>
                <ReactAutocomplete
                    wrapperStyle={{ width: "100%" }}
                    items={options}
                    getItemValue={(item) => item.label}
                    renderItem={(item, highlighted) => (
                        <div
                            key={item.key}
                            style={Object.assign(
                                {
                                    backgroundColor: highlighted
                                        ? this.props.highlight
                                        : this.props.unhighlight,
                                    textAlign: "left",
                                    border: "solid #d9d9d9 1px",
                                    height: "32px",
                                    padding: "0 5px 0 5px",
                                    whiteSpace: "nowrap",
                                    lineHeight: "32px",
                                },
                                this.state.options.indexOf(item) !== 0
                                    ? { borderTop: "0" }
                                    : {},
                                this.props.renderStyle
                            )}
                        >
                            {item.label}
                        </div>
                    )}
                    renderMenu={(options, value, style) => {
                        return (
                            <div
                                style={{
                                    ...style,
                                    ...this.menuStyle,
                                    zIndex: "999",
                                    position: "absolute",
                                    top: "auto",
                                    left: "auto",
                                }}
                            >
                                {options}
                            </div>
                        );
                    }}
                    inputProps={{
                        disabled: this.props.disabled,
                        placeholder: this.props.placeholder,
                        style: Object.assign(
                            {
                                height: "40px",
                                width: "100%",
                                borderRadius: "4px",
                                border: "solid #d9d9d9 1px",
                                paddingLeft: "10px",
                                fontSize: "15px",
                            },
                            this.props.style
                        ),
                        maxLength:100
                    }}
                    value={this.props.value}
                    onChange={(e) => this.handleChange(e)}
                    onSelect={(value) => this.handelSelect(value)}
                />
            </div>
        );
    }
}

ThailandAddress.defaultProps = {
    delimiter: ", ",
    placeholder: "",
    highlight: "#eee",
    unhighlight: "white",
    style: {},
    renderStyle: {},
    value: "",
    address: "subdistrict",
    onChange: () => {},
    onSelect: () => {},
};

ThailandAddress.propTypes = {
    address: PropTypes.string,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
    delimiter: PropTypes.string,
    placeholder: PropTypes.string,
    highlight: PropTypes.string,
    unhighlight: PropTypes.string,
    style: PropTypes.shape({}),
    renderStyle: PropTypes.shape({}),
};

export default ThailandAddress;
