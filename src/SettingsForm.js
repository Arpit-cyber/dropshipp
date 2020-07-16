import React, { useState, useCallback } from 'react'

//@shopify/polaris Component
import {
    Layout, AccountConnection, Link, Card, Checkbox, TextField,
    FormLayout, Stack, RadioButton, Select, PageActions
} from '@shopify/polaris'

export const SettingsForm = () => {
    const [checkPublished, setCheckPublished] = useState(false);
    const [checkShipping, setCheckShipping] = useState(false);
    const [value, setValue] = useState('Never');
    const [priceChange, setPriceChange] = useState(false);
    const [priceChange1, setPriceChange1] = useState('');
        
    const AccountConnectionExample = () => {
        const [connected, setConnected] = useState(false);
        const accountName = connected ? 'Arpit Kumar' : '';

        const handleAction = useCallback(() => {
            setConnected((connected) => !connected);
        }, []);

        const buttonText = connected ? 'Disconnect' : 'Connect';
        const details = connected ? 'Account connected' : 'No account connected';
        const terms = connected ? null : (
            <p>
                By clicking <strong>Connect</strong>, you agree to accept Dropshipp’s{' '}
                <Link url="#">terms and conditions</Link>. You’ll pay a
                commission rate of 15% on sales made through Dropshipp.
            </p>
        );
        
        return (
            <AccountConnection
                accountName={accountName}
                connected={connected}
                title="Dropshipp"
                action={{
                    content: buttonText,
                    onAction: handleAction,
                }}
                details={details}
                termsOfService={terms}
            /> 
        )
    }

    function TextFieldExample() {
        const [value, setValue] = useState('');

        const handleChange = useCallback((newValue) => setValue(newValue), []);

        return <TextField
            label="Custom shipment tracking URL"
            value={value}
            onChange={handleChange}
            helpText={
                <p>Overrides the normal shipment tracking link emailed to your customer.{' '}
                    <Link url="#">Learn more about custom tracking URLs.</Link>
                </p>
            }
        />;
    }

    const handleChange1 = useCallback((newValue) => setPriceChange1(newValue), []);

        return (
            <form>
                <Layout>
                    <Layout.AnnotatedSection
                        title="Connected User"
                        description="Connect your shopify store with your Dropshipp account."
                    >
                    <AccountConnectionExample />
                    </Layout.AnnotatedSection>

                    <Layout.AnnotatedSection
                        title="Selling and Shipping"
                        description="Manager products, pricing, shipping and customer notification."
                    >
                        <Card sectioned title="Products">
                            <Checkbox
                                label="Automatically publish new products"
                                helpText="New products added in Dropshipp will immediately be published to all of your Shopify sales channels."
                                checked={checkPublished}
                                onChange={() => setCheckPublished(!checkPublished)}
                            />
                        </Card>

                        <Card sectioned title="Pricing Rules">
                            <Stack alignment="baseline">
                                <span>Product list price {' '} = </span>
                                <span>Your cost { priceChange ? '+' : 'x'}</span>
                                <div>
                                    <TextField
                                        connectedLeft={<Select
                                            label="Pricing rule method"
                                            options={['Multiply', 'Fixed markup']}
                                            labelHidden
                                            value={ priceChange ? 'Fixed markup' : 'Multiply'}
                                            onChange={(e) => setPriceChange(!priceChange) }
                                        />}
                                        value={priceChange1}
                                        onChange={handleChange1}
                                    />
                                </div>
                            </Stack>
                        </Card>

                        <Card sectioned title="Shipping">
                            <FormLayout>
                                <Checkbox
                                    label="Email customers when orders are fulfilled"
                                    checked={checkShipping}
                                    onChange={() => setCheckShipping(!checkShipping)}
                                />
                                <TextFieldExample />
                            </FormLayout>
                        </Card>
                    </Layout.AnnotatedSection>

                    <Layout.AnnotatedSection
                        title="Reporting"
                        description="Manage how you track success with Dropshipp."
                    >
                        <Card sectioned>
                            <p>Receive reports via email:</p>
                            <Stack vertical>
                                <RadioButton
                                    label="Never"
                                    checked={value === 'never'}
                                    onChange={() => setValue('never')}
                                />
                                <RadioButton
                                    label="Daily"
                                    checked={value === 'daily'}
                                    onChange={() => setValue('daily')}
                                />
                                <RadioButton
                                    label="Weekly"
                                    checked={value === 'week'}
                                    onChange={() => setValue('week')}
                                />
                                <RadioButton
                                    label="Monthly"
                                    checked={value === 'month'}
                                    onChange={() => setValue('month')}
                                />
                            </Stack>
                        </Card>
                    </Layout.AnnotatedSection>

                    <Layout.Section>
                        <PageActions
                            primaryAction={{
                                content: 'Save',
                                submit: true
                            }}
                        />
                    </Layout.Section>
                </Layout>
            </form>
        )
}
