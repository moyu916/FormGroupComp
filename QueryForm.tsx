import React, { useEffect, useRef, useState } from 'react'
import FromGroup from './components/FormGroup/index'

const QueryField = () => {
    const formRef = useRef(null)
    const { helpCenterStore } = useStores()
    // 当前二级标题列表
    const [currentSecondTitleList, setCurrentSecondTitleList] = useState([])
    // 是否禁止选择二级标题
    const [isDisabled, setIsDisabled] = useState(true)
    const handleFinish = () => {
        if (formRef.current.validateFields()) {
            const values = formRef.current.getFieldsValue()
            helpCenterStore.query(values)
        }
    }
    
    const defaultQueryData = {
        firstTitleId: null,
        secondTitleId: null,
        valid: null
    }

    const formConfig = [
        {
            type: 'Select',
            label: '一级标题: ',
            key: 'firstTitleId',
            dataSource: helpCenterStore.firstTitleList,
            placeholder: '全部'
        },
        {
            type: 'Select',
            label: '二级标题: ',
            key: 'secondTitleId',
            dataSource: currentSecondTitleList,
            placeholder: '全部',
            disabled: isDisabled
        },
        { type: 'Select', label: '状态: ', key: 'valid', dataSource: helpCenterStore.statusList, placeholder: '全部' }
    ]

    return (
        <FromGroup
            formRef={formRef}
            defaultValue={defaultQueryData}
            formConfig={formConfig}
            onFinish={handleFinish}
            isNeedButton
        />
    )
}

export default QueryField
