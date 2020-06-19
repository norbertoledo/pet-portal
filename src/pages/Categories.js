import React from 'react';
import { Layout, Tabs } from 'antd';
import CategoriesServices from '../components/CategoriesServices';
import CategoriesPlaces from '../components/CategoriesPlaces';

export default function Categories() {

    const { Content } = Layout;
    const { TabPane } = Tabs;

    return (
        <Layout className="categories">
            <Content className="categories__content">
                <div className="categories__content-tabs">
                    <Tabs 
                        defaultActiveKey="1" 
                        type="card"
                        >
                        <TabPane 
                            tab={<span>Servicios</span>} 
                            key="1">
                            <CategoriesServices/>
                        </TabPane>
                        <TabPane 
                            tab={<span>Lugares</span>} 
                            key="2">
                            <CategoriesPlaces/>
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    )
}


