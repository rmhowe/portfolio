struct ComputeInput {
  @builtin(global_invocation_id) cell: vec3u
};

@group(0) @binding(0) var<uniform> grid: vec2f;
@group(0) @binding(1) var<storage> cellStateIn: array<u32>;
@group(0) @binding(2) var<storage, read_write> cellStateOut: array<u32>;

fn cellIndex(cell: vec2u) -> u32 {
  return (cell.y % u32(grid.y)) * u32(grid.x) + (cell.x % u32(grid.x));
}

fn cellActive(x: u32, y: u32) -> u32 {
  return cellStateIn[cellIndex(vec2(x, y))];
}

@compute
@workgroup_size(8, 8)
fn computeMain(input: ComputeInput) {
  let x = input.cell.x;
  let y = input.cell.y;
  let activeNeighbours = cellActive(x + 1, y + 1) +
                         cellActive(x + 1, y) +
                         cellActive(x + 1, y - 1) +
                         cellActive(x - 1, y + 1) +
                         cellActive(x - 1, y) +
                         cellActive(x - 1, y - 1) +
                         cellActive(x, y + 1) +
                         cellActive(x, y - 1);

  let i = cellIndex(input.cell.xy);
  switch activeNeighbours {
    case 2: {
      cellStateOut[i] = cellStateIn[i];
    }
    case 3: {
      cellStateOut[i] = 1;
    }
    default: {
      cellStateOut[i] = 0;
    }
  }
}
