## REMEMBER TO CHANGE THE PRODUCT STRIPE PUBLISHABLE KEY

lambda for stripe charges.

## requirements

- up
- aws account configured (~/.aws or env)
- node 8+

## installation

```
npm i
```

## test

configure `.env` and run server in test mode

```
NODE_ENV=test npm t
```

```
npm t
```

## deployment

### requirements

configure `up.json` and aws account

### deploy production and development

```
npm run deploy 
```

### stack updates

```
npm run stack:apply
```