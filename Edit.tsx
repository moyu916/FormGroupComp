import React, { useEffect, useRef, useState } from 'react'
import FromGroup from './components/FormGroup/index'

const Edit = props => {
    const formRef = useRef(null)
    const { helpCenterTitleStore } = useStores()
    const { detailData } = helpCenterTitleStore
    const [pageTitle, setPageTitle] = useState('新建标题')
    const isDisabled = false
    let isFirstTitle
    let labelName

    const isTopType = [
        {
            code: 0,
            name: '否'
        },
        {
            code: 1,
            name: '是'
        }
    ]

    const formWrapConfig = {
        className: 'form-layout',
        key: detailData.id,
        labelWidth: '125px',
        style: { width: '65em' }
    }

    let formConfig
    const commonConfig = [
        {
            type: 'Input',
            label: labelName,
            key: 'sortId',
            disabled: isDisabled,
            placeholder: '请输入排序序号，例如1-9数字组合',
            style: { width: '330px' },
            span: 24,
            formItemOther: {
                rules: [
                    {
                        pattern: /^\d+$/,
                        message: '请输入整数数字'
                    },
                    {
                        max: 20,
                        transform: value => value.toString(),
                        message: '不可超过20个字符'
                    }
                ]
            }
        },
        {
            type: 'Radio',
            label: '是否置顶：',
            key: 'isTop',
            dataSource: isTopType,
            disabled: isDisabled,
            style: { width: '330px' },
            span: 24,
            formItemOther: {
                required: true,
                rules: [
                    {
                        required: true,
                        message: '是否置顶为必选项'
                    }
                ]
            }
        }
    ]
    if (isFirstTitle) {
        formConfig = [
            {
                type: 'Input',
                label: '一级标题：',
                key: 'firstTitle',
                disabled: isDisabled,
                placeholder: '请填写一级标题',
                style: { width: '330px' },
                span: 24,
                formItemOther: {
                    required: true,
                    rules: [
                        {
                            required: true,
                            message: '请填写一级标题'
                        },
                        {
                            max: 20,
                            message: '不可超过20个字符'
                        }
                    ]
                }
            },
            ...commonConfig
        ]
    } else {
        formConfig = [
            {
                type: 'Select',
                label: '一级标题：',
                key: 'firstTitleId',
                disabled: isDisabled,
                dataSource: helpCenterTitleStore.firstTitleList,
                placeholder: '请选择一级标题',
                style: { width: '330px' },
                span: 24,
                formItemOther: {
                    required: true,
                    rules: [
                        {
                            required: true,
                            message: '请选择一级标题'
                        }
                    ]
                }
            },
            {
                type: 'Input',
                label: '二级标题：',
                key: 'secondTitle',
                disabled: isDisabled,
                placeholder: '请输入二级标题',
                style: { width: '330px' },
                span: 24,
                formItemOther: {
                    required: true,
                    rules: [
                        {
                            required: true,
                            message: '请输入二级标题'
                        },
                        {
                            max: 20,
                            message: '不可超过20个字符'
                        }
                    ]
                }
            },
            ...commonConfig
        ]
    }

    return (
        <div>
            <h1 className="page-headline">{pageTitle}</h1>
            <>
                <FromGroup
                    formWrapConfig={formWrapConfig}
                    formRef={formRef}
                    defaultValue={detailData}
                    formConfig={formConfig}
                    onFinish={onFinish}
                    isNeedButton
                />
            </>
        </div>
    )
}

export default Edit
