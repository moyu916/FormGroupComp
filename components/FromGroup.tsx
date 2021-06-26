import React from 'react'
import { Form, Input, Select, Button, Radio, Col } from 'antd'


interface FormGroupProps {
    formWrapConfig?: object // 用于自定义Form上的属性
    formRef: any
    defaultValue: object
    formConfig: Array<any>
    isNeedButton?: boolean
    onFinish (value: any): void
    callback?(): void
}

interface ItemProps {
    type?: string
    label?: string
    key?: string
    dataSource?: Array<any>
    disabled?: boolean
    placeholder?: string
    element?: any
    wrapperCol?: object
    formItemOther?: any //form.item 上的自定义配置
}

// select option的类型
interface SelectOption {
    name: string | number
    value: number
}

const FormGroup = ({
    formWrapConfig,
    formRef,
    defaultValue,
    formConfig,
    onFinish,
    isNeedButton,
}: FormGroupProps) => {
    const renderFormItem = ({
        type,
        disabled,
        dataSource,
        placeholder,
        element,
        formItemOther,
        wrapperCol,
        ...others
    }: ItemProps) => {
        let one
        switch (type) {
            case 'Select':
                one = (
                    <Select
                        disabled={disabled}
                        filterOption
                        placeholder={placeholder}
                        {...others}
                    >
                        {dataSource && dataSource.map((elem: SelectOption) => (
                            <Select.Option key={elem.value} value={elem.value}>
                                {elem.name}
                            </Select.Option>
                        ))}
                    </Select>
                )
                break
            case 'Input':
                one = <Input 
                    disabled={disabled} placeholder={placeholder} {...others} />
                break
            case 'Radio':
                one = (
                    <Radio.Group 
                        disabled={disabled} {...others}>
                        {dataSource && dataSource.map(option => (
                            <Radio key={option.code} value={option.code}>
                                {option.name}
                            </Radio>
                        ))}
                    </Radio.Group>
                )
                break
            case 'Custom': // 用户自定义的FormItem,前面的不满足用户想用的
                return element
            default:
                one = null
        }
        return one
    }
    return (
        <Form
            ref={formRef}
            initialValues={defaultValue}
            onFinish={onFinish}
            {...formWrapConfig}
        >
            {formConfig.map((item: ItemProps) => (
                <Form.Item
                    name={item.key}
                    label={item.label}
                    key={item.key}
                    {...item.formItemOther}
                >
                    {renderFormItem(item)}
                </Form.Item>
            ))}
            {isNeedButton && (
                <Form.Item
                >
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                </Form.Item>
            )}
        </Form>
    )
}

export default FormGroup