# ohyounghwa

### 설치

    npm install

### ESlint 적용

    npm run eslint:fix

를 입력하면 코드를 규칙에 맞게 수정할 수 있습니다.

### 폴더구조

**main.tsx**

    route를 설정합니다. context provider도 설정합니다.

**pages폴더**

    route에서 보여줄 페이지들을 관리합니다.

    각 페이지 폴더들은 해당 페이지를 그릴 때 필요한 api, hook, model, store, component, css등을 포함합니다.

    api는 axios로 요청을 하고 데이터를 받는 함수가 들어갑니다.

    이 함수를 이용해서 hooks폴더에서 reactquery로 커스텀 훅을 만들어 데이터 요청을 관리합니다.

    해당 요청으로 오는 데이터의 형식을 model폴더에서 정의합니다.

    css폴더에 scss파일이 들어갑니다.

    store파일에는 상태관리 함수가 들어갑니다.

**auth폴더**

    유저 인증 관련 로직을 처리합니다.

**context폴더**

    상태를 관리하기 위한 provider가 들어갑니다.

    ⇒ 차후 redux tool kit으로 바꿀 예정입니다.

**feature**

    제가 redux tool kit이 익숙치 않아 예시 컴포넌트를 만들어놨습니다.

**shared폴더**

    프로젝트의 여러 페이지에서 공통으로 쓰일 요소들을 모아두었습니다.
    api폴더에는 공통으로 쓰일 데이터 요청 함수가 들어갑니다.

    components 폴더에서 여러 페이지에서 공통으로 사용하는 컴포넌트를 보관합니다.

    components는 다시 atom, molecules 폴더로 나뉘는데, atom에는 text, input, button등 최소한의 div 태그 단위의 컴포넌트가 들어갑니다.

    icon들은 icons폴더에 모아둡니다.

    molecules폴더에는 atom컴포넌트들이 모여 만든, 하나의 기능을 하는 컴포넌트들이 들어갑니다. select컴포넌트라던가 input form 컴포넌트라던가. 위젯같은겁니다.

    store폴더에서 상태관리를 담당합니다.

    utils에는 프로젝트의 모든 요청에 쓰일 axios인스턴스와, api 경로가 들어갑니다.

### 데이터 요청

    1. shared/utils/axiosClinet.ts 파일에서 원하는 axios클라이언트를 선택한다
    2. 데이터를 사용할 페이지의 api폴더에서 ts파일을 생성하고, axios요청을 작성한다
    3. hooks폴더에서 react query를 사용해서 커스텀 훅을 만든다
    4. 사용하려는 컴포넌트에서 해당 훅을 사용해서 데이터를 사용한다.

### 페이지 작성

    페이지를 이루는 모든 것(컴포넌트, css, 훅, 모델 등)은 모두 해당 페이지에 있도록 한다. 공통적인것들은 shared에서 가져다 쓴다.
